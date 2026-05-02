#!/usr/bin/env python3
"""Streamlit web UI for the Policy Interest Rate Simulator."""

import altair as alt
import pandas as pd
import streamlit as st

from economy import Economy
from endgame_logic import EndGameContext, build_end_of_term_message, mandate_targets

APP_TITLE = "Policy Interest Rate Simulator"
PLAYER_START_TURN = 40
OFFSET = 10
TERM_LENGTH = 16
SCENARIOS = ["Random", "Stable Economy", "Stagflation", "High Inflation", "Depression"]
MANDATES = {
    "Inflation Target": "inflation_target",
    "Dual Mandate": "dual_mandate",
}


def _sample_scenario(_: str):
    return None


def _activate_player_difficulty(econ: Economy, difficulty: str) -> None:
    econ.difficulty = difficulty
    econ.event_cooldown_quarters = econ._difficulty_event_cooldown(difficulty)
    econ.shock_sd_scale = econ._difficulty_shock_scale(difficulty)
    econ.simplified_dynamics = difficulty == "principles"


def _apply_scenario_initial_conditions(econ: Economy, scenario_name: str) -> None:
    if scenario_name == "High Inflation":
        econ.indicators.inflation_rate = 20.0
        econ.interest_rate = 6.0
        econ.indicators.unemployment_rate = 3.0
        econ._initialize_variables()


def _apply_bootstrap_persona(econ: Economy, scenario_name: str) -> None:
    if scenario_name == "Stable Economy":
        econ.cb_persona = "good"
    elif scenario_name == "Stagflation":
        econ.cb_persona = "dove"
    elif scenario_name == "High Inflation":
        econ.cb_persona = "careless"
    elif scenario_name == "Depression":
        econ.cb_persona = "hawk"


def _new_game(difficulty: str, scenario_name: str, mandate: str) -> None:
    econ = Economy(difficulty="central_banker", scenario=_sample_scenario(scenario_name))
    econ.offset = OFFSET
    econ.player_start_turn = PLAYER_START_TURN
    _apply_scenario_initial_conditions(econ, scenario_name)

    news_log = []
    total_turns = PLAYER_START_TURN + OFFSET
    _apply_bootstrap_persona(econ, scenario_name)
    for _ in range(total_turns):
        econ.adjust_interest_rate_with_taylor()
        result = econ.simulate_quarter()
        if result.get("event_name") and econ.current_quarter > OFFSET:
            news_log.append({
                "quarter": econ.current_quarter,
                "in_term_quarter": 0,
                "name": result["event_name"],
                "detail": result.get("event") or "",
                "fired_this_turn": False,
            })

    _activate_player_difficulty(econ, difficulty)

    unemployment_history = econ.variables.get_history("unemployment_rate")
    sample = unemployment_history[-10:] if len(unemployment_history) >= 10 else unemployment_history
    dual_target = int(round(sum(sample) / len(sample))) if len(sample) >= 10 else 5

    st.session_state.economy = econ
    st.session_state.news_log = news_log[-100:]
    st.session_state.game_over = False
    st.session_state.player_turn = 1
    st.session_state.in_term_quarter = 1
    st.session_state.initial_inflation = econ.indicators.inflation_rate
    st.session_state.initial_unemployment = econ.indicators.unemployment_rate
    st.session_state.difficulty = difficulty
    st.session_state.scenario_name = scenario_name
    st.session_state.mandate = mandate
    st.session_state.dual_unemployment_target = dual_target
    st.session_state.end_message = ""
    st.session_state.graph_window_mode = "full"
    st.session_state.graph_split_mode = False
    st.session_state.show_targets_on_graph = False
    st.session_state.end_summary = None
    st.session_state.game_started = True
    st.session_state.show_end_dialog = False
    st.session_state.latest_fired = False


def _plot_histories(econ: Economy, window_mode: str, split_mode: bool, show_targets: bool, mandate: str, dual_unemployment_target: int):
    inflation_history = econ.variables.get_history("inflation_rate")
    unemployment_history = econ.variables.get_history("unemployment_rate")
    interest_rate_history = econ.variables.get_history("interest_rate")

    start_idx = max(0, len(inflation_history) - 20) if window_mode == "past20" else 0
    quarters = list(range(start_idx, len(inflation_history)))

    rows = []
    for i, q in enumerate(quarters):
        rows.append({"Quarter": q, "Metric": "Inflation", "Value": inflation_history[start_idx + i], "Panel": "Top" if split_mode else "Combined"})
        rows.append({"Quarter": q, "Metric": "Interest Rate", "Value": interest_rate_history[start_idx + i], "Panel": "Top" if split_mode else "Combined"})
        rows.append({"Quarter": q, "Metric": "Unemployment", "Value": unemployment_history[start_idx + i], "Panel": "Bottom" if split_mode else "Combined"})

    df = pd.DataFrame(rows)
    palette = {"Inflation": "red", "Unemployment": "blue", "Interest Rate": "green"}

    base = alt.Chart(df).mark_line().encode(
        x=alt.X("Quarter:Q", title="Quarter"),
        y=alt.Y("Value:Q", title="Percent"),
        color=alt.Color("Metric:N", scale=alt.Scale(domain=list(palette.keys()), range=list(palette.values()))),
        strokeDash=alt.condition(alt.datum.Metric == "Interest Rate", alt.value([6, 4]), alt.value([1, 0])),
    )

    player_line = alt.Chart(pd.DataFrame([{"Quarter": PLAYER_START_TURN + OFFSET}])).mark_rule(color="black", strokeDash=[4, 4]).encode(x="Quarter:Q")
    layers = [base, player_line]

    if show_targets:
        t = mandate_targets(mandate, dual_unemployment_target)
        targets = [{"Value": t["inflation"], "Color": "red"}]
        if t["unemployment"] is not None:
            targets.append({"Value": t["unemployment"], "Color": "blue"})
        target_chart = alt.Chart(pd.DataFrame(targets)).mark_rule(strokeDash=[2, 2], opacity=0.6).encode(y="Value:Q", color=alt.Color("Color:N", scale=None))
        layers.append(target_chart)

    chart = alt.layer(*layers).properties(height=320)
    return alt.vconcat(chart.transform_filter("datum.Panel == 'Top'"), chart.transform_filter("datum.Panel == 'Bottom'")).resolve_scale(color='shared') if split_mode else chart


def _finish_game_if_needed() -> None:
    if st.session_state.in_term_quarter <= TERM_LENGTH:
        return

    st.session_state.game_over = True
    econ = st.session_state.economy
    term_start_idx = max(0, PLAYER_START_TURN + OFFSET)
    term_end_idx = term_start_idx + TERM_LENGTH

    infl_term = econ.variables.get_history("inflation_rate")[term_start_idx:term_end_idx]
    unemp_term = econ.variables.get_history("unemployment_rate")[term_start_idx:term_end_idx]
    real_term = econ.variables.get_history("real_interest_rate")[term_start_idx:term_end_idx]

    term_events = [e["name"] for e in st.session_state.news_log if e.get("in_term_quarter", 0) > 0 and e["in_term_quarter"] <= TERM_LENGTH]

    message = build_end_of_term_message(
        EndGameContext(
            mandate=st.session_state.mandate,
            initial_inflation=st.session_state.initial_inflation,
            initial_unemployment=st.session_state.initial_unemployment,
            dual_unemployment_target=st.session_state.dual_unemployment_target,
            inflation_history=infl_term,
            unemployment_history=unemp_term,
            real_interest_rate_history=real_term,
            term_event_names=term_events,
        )
    )
    st.session_state.end_message = message
    st.session_state.show_end_dialog = True


def _next_quarter(user_rate: float) -> None:
    econ = st.session_state.economy
    econ.adjust_interest_rate(float(user_rate))
    result = econ.simulate_quarter()

    st.session_state.latest_fired = bool(result.get("event_name"))
    if st.session_state.latest_fired:
        st.session_state.news_log.append({
            "quarter": econ.current_quarter,
            "in_term_quarter": st.session_state.in_term_quarter,
            "name": result["event_name"],
            "detail": result.get("event") or "",
            "fired_this_turn": True,
        })
        st.session_state.news_log = st.session_state.news_log[-100:]

    st.session_state.player_turn += 1
    st.session_state.in_term_quarter += 1
    _finish_game_if_needed()


def _render_end_dialog() -> None:
    if not st.session_state.get("show_end_dialog", False):
        return

    @st.dialog("End of Term")
    def _dlg():
        st.write(st.session_state.end_message)
        c1, c2 = st.columns(2)
        if c1.button("Continue Playing", use_container_width=True):
            st.session_state.game_over = False
            st.session_state.show_end_dialog = False
            st.rerun()
        if c2.button("Retire", use_container_width=True):
            st.session_state.show_end_dialog = False
            st.rerun()

    _dlg()


def _render_start_page() -> None:
    st.title(APP_TITLE)
    st.subheader("Start Menu")
    difficulty = st.radio("Difficulty", ["principles", "senior", "central_banker"], index=2, key="start_difficulty")
    scenario_name = st.radio("Scenario", SCENARIOS, index=0, key="start_scenario")
    mandate_label = st.radio("Mandate", list(MANDATES.keys()), index=0, key="start_mandate")
    if st.button("Start Game", type="primary"):
        _new_game(difficulty, scenario_name, MANDATES[mandate_label])
        st.rerun()


def main() -> None:
    st.set_page_config(page_title=APP_TITLE, layout="wide")
    st.title(APP_TITLE)

    if "game_started" not in st.session_state:
        st.session_state.game_started = False

    if not st.session_state.game_started:
        _render_start_page()
        return

    if "economy" not in st.session_state:
        _new_game("central_banker", "Random", "inflation_target")

    _render_end_dialog()
    econ = st.session_state.economy
    state = econ.get_state()

    outer_left, outer_right = st.columns([1.1, 2.2])

    with outer_left:
        st.markdown("### Economic Indicators")
        st.markdown(f"**Inflation Rate:** {state['inflation_rate']:.2f}%")
        st.markdown(f"**Unemployment Rate:** {state['unemployment_rate']:.2f}%")
        st.markdown(f"**Interest Rate:** {state['interest_rate']:.2f}%")

        st.markdown("### News Feed")
        with st.container(border=False):
            st.markdown('<div style="background:#2f2f2f;padding:10px;border-radius:8px;max-height:420px;overflow-y:auto;">', unsafe_allow_html=True)
            if st.session_state.news_log:
                for idx, item in enumerate(reversed(st.session_state.news_log)):
                    color = "#ff4b4b" if idx == 0 and st.session_state.latest_fired else "#ffffff"
                    label = f"Q{item['quarter']}: {item['name']}"
                    if st.button(label, key=f"news_{item['quarter']}_{idx}"):
                        st.session_state[f"open_news_{item['quarter']}_{idx}"] = not st.session_state.get(f"open_news_{item['quarter']}_{idx}", False)
                    if st.session_state.get(f"open_news_{item['quarter']}_{idx}", False) and item.get("detail"):
                        st.markdown(f"<div style='color:#ffffff;margin:0 0 8px 0;'>{item['detail']}</div>", unsafe_allow_html=True)
                    st.markdown(f"<div style='margin-top:-30px;margin-left:8px;color:{color};'>{label}</div>", unsafe_allow_html=True)
            else:
                st.markdown("<div style='color:#ffffff;'>No events yet.</div>", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

    with outer_right:
        st.markdown("### Economic Graphs")
        if st.session_state.latest_fired:
            st.markdown("<div style='color:red;font-weight:700;'>NEWS!</div>", unsafe_allow_html=True)
        g1, g2, g3 = st.columns(3)
        st.session_state.graph_window_mode = "past20" if g1.toggle("Past 20 turns", value=(st.session_state.graph_window_mode == "past20")) else "full"
        st.session_state.graph_split_mode = g2.toggle("Split charts", value=st.session_state.graph_split_mode)
        st.session_state.show_targets_on_graph = g3.toggle("Show targets", value=st.session_state.show_targets_on_graph)

        chart = _plot_histories(econ, st.session_state.graph_window_mode, st.session_state.graph_split_mode, st.session_state.show_targets_on_graph, st.session_state.mandate, st.session_state.dual_unemployment_target)
        st.altair_chart(chart, use_container_width=True)

    st.markdown("### Policy action")
    if "rate_text" not in st.session_state:
        st.session_state.rate_text = f"{state['interest_rate']:.2f}"

    with st.form("policy_form", clear_on_submit=False):
        user_rate_text = st.text_input("Enter New Interest Rate", value=st.session_state.rate_text)
        submitted = st.form_submit_button("Next", type="primary", use_container_width=True, disabled=st.session_state.game_over)

    if submitted:
        st.session_state.rate_text = user_rate_text
        try:
            user_rate = float(user_rate_text)
        except ValueError:
            st.error("Please enter a valid number for the interest rate.")
            return
        if user_rate < 0:
            st.error("Interest rate cannot be negative.")
            return
        _next_quarter(user_rate)
        st.session_state.rate_text = f"{st.session_state.economy.interest_rate:.2f}"
        st.rerun()


if __name__ == "__main__":
    main()
