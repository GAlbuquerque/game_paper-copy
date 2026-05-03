#!/usr/bin/env python3
"""Streamlit web UI for the Policy Interest Rate Simulator."""

import io

import altair as alt
import pandas as pd
import streamlit as st
from collections import defaultdict

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


def _has_past_event(econ: Economy, event_name: str) -> bool:
    return any(event_name in quarter_events for quarter_events in econ.past_events)


def _force_event_by_name(econ: Economy, scenario_name: str, event_name: str, news_log: list[dict]) -> None:
    event = next((e for e in econ.events if e.name == event_name), None)
    if event is None:
        return
    econ.enqueue_event(event)
    econ.apply_event_effects(dict(econ.effect_queue[0]))
    econ.effect_queue[0] = defaultdict(float)
    econ.past_events.append([event.name])
    econ.past_events = econ.past_events[-8:]
    if econ.current_quarter > OFFSET:
        news_log.append({
            "quarter": econ.current_quarter - OFFSET,
            "in_term_quarter": 0,
            "name": event.name,
            "detail": "",
            "fired_this_turn": False,
        })


def _force_stagflation_supply_shock(econ: Economy, scenario_name: str, news_log: list[dict]) -> None:
    history = econ._build_history_snapshot()
    weighted_candidates = []
    for event_name in ["Global Supply Shock", "Pandemic Outbreak", "Natural Disaster"]:
        event = next((e for e in econ.events if e.name == event_name), None)
        if event is None:
            continue
        weight = max(0.0, float(event.get_probability(history)))
        weighted_candidates.append((event.name, weight))
    if not weighted_candidates:
        return
    total_weight = sum(weight for _, weight in weighted_candidates)
    if total_weight <= 0:
        selected_name = weighted_candidates[0][0]
    else:
        import random
        names = [name for name, _ in weighted_candidates]
        weights = [weight for _, weight in weighted_candidates]
        selected_name = random.choices(names, weights=weights, k=1)[0]
    _force_event_by_name(econ, scenario_name, selected_name, news_log)


def _new_game(difficulty: str, scenario_name: str, mandate: str) -> None:
    econ = Economy(difficulty="central_banker", scenario=_sample_scenario(scenario_name))
    econ.offset = OFFSET
    econ.player_start_turn = PLAYER_START_TURN
    _apply_scenario_initial_conditions(econ, scenario_name)

    news_log = []
    total_turns = PLAYER_START_TURN + OFFSET
    _apply_bootstrap_persona(econ, scenario_name)
    hyperinflation_prob_boosted = False
    for idx in range(total_turns):
        if scenario_name == "Stable Economy" and idx >= total_turns - 10:
            econ.last_event_quarter = econ.current_quarter
        if scenario_name == "High Inflation" and not hyperinflation_prob_boosted:
            for event in econ.events:
                if event.name == "Spending Wave":
                    for term in event.prob_terms:
                        if term.label == "a_base":
                            original_fn = term.fn
                            term.fn = lambda h, _f=original_fn: min(1.0, 10 * float(_f(h)))
                            hyperinflation_prob_boosted = True

        econ.adjust_interest_rate_with_taylor()
        result = econ.simulate_quarter()
        three_before_player = total_turns - 3
        if idx == three_before_player:
            if scenario_name == "Depression":
                _force_event_by_name(econ, scenario_name, "Major Financial Crisis", news_log)
            if scenario_name == "Stagflation":
                _force_stagflation_supply_shock(econ, scenario_name, news_log)
        if scenario_name == "High Inflation" and idx == total_turns - 1:
            if not _has_past_event(econ, "Spending Wave"):
                _force_event_by_name(econ, scenario_name, "Spending Wave", news_log)

        if result.get("event") and econ.current_quarter > OFFSET:
            news_log.append({
                "quarter": econ.current_quarter - OFFSET,
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
    st.session_state.term_start_idx = max(0, PLAYER_START_TURN + OFFSET)
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


def _plot_histories(econ: Economy, window_mode: str, split_mode: bool, show_targets: bool, mandate: str, dual_unemployment_target: int, show_news_banner: bool):
    inflation_history = econ.variables.get_history("inflation_rate")
    unemployment_history = econ.variables.get_history("unemployment_rate")
    interest_rate_history = econ.variables.get_history("interest_rate")

    start_idx = max(0, len(inflation_history) - 20) if window_mode == "past20" else 0
    quarters = list(range(start_idx, len(inflation_history)))

    rows = []
    for i, q in enumerate(quarters):
        rows.append({"Quarter": q, "Metric": "Inflation", "Value": inflation_history[start_idx + i], "Panel": "left"})
        rows.append({"Quarter": q, "Metric": "Interest Rate", "Value": interest_rate_history[start_idx + i], "Panel": "left"})
        rows.append({"Quarter": q, "Metric": "Unemployment", "Value": unemployment_history[start_idx + i], "Panel": "right"})

    if econ.difficulty == "principles":
        natural = econ.variables.get_history("natural_unemployment_rate")[start_idx:]
        for i, q in enumerate(quarters):
            rows.append({"Quarter": q, "Metric": "Natural unemployment", "Value": natural[i], "Panel": "right"})

    df = pd.DataFrame(rows)
    palette = {"Inflation": "red", "Unemployment": "blue", "Interest Rate": "green", "Natural unemployment": "black"}

    base = alt.Chart(df).mark_line().encode(
        x=alt.X("Quarter:Q", title="Quarter"),
        y=alt.Y("Value:Q", title="Percent"),
        color=alt.Color("Metric:N", scale=alt.Scale(domain=list(palette.keys()), range=list(palette.values()))),
        strokeDash=alt.condition(alt.datum.Metric == "Interest Rate", alt.value([6, 4]), alt.value([1, 0])),
    )

    player_line = alt.Chart(pd.DataFrame([{"Quarter": PLAYER_START_TURN}])).mark_rule(color="black", strokeDash=[4, 4]).encode(x="Quarter:Q")

    target_layers_left, target_layers_right = [], []
    if show_targets:
        t = mandate_targets(mandate, dual_unemployment_target)
        target_layers_left.append(alt.Chart(pd.DataFrame([{"Value": t["inflation"]}])).mark_rule(color="red", strokeDash=[2, 2], opacity=0.6).encode(y="Value:Q"))
        if t["unemployment"] is not None:
            target_layers_right.append(alt.Chart(pd.DataFrame([{"Value": t["unemployment"]}])).mark_rule(color="blue", strokeDash=[2, 2], opacity=0.6).encode(y="Value:Q"))

    news_layer = None
    if show_news_banner and quarters:
        max_y = max(inflation_history[start_idx:] + unemployment_history[start_idx:] + interest_rate_history[start_idx:])
        mid_q = quarters[len(quarters) // 2]
        news_layer = alt.Chart(pd.DataFrame([{"Quarter": mid_q, "Value": max_y + 0.8, "Label": "NEWS!"}])).mark_text(
            color="red", fontSize=20, fontWeight="bold", align="center", baseline="top"
        ).encode(x="Quarter:Q", y="Value:Q", text="Label:N")

    if split_mode:
        left_chart = alt.layer(base.transform_filter("datum.Panel == 'left'"), player_line, *target_layers_left).properties(height=220)
        right_layers = [base.transform_filter("datum.Panel == 'right'"), player_line, *target_layers_right]
        if news_layer is not None:
            right_layers.append(news_layer)
        right_chart = alt.layer(*right_layers).properties(height=220)
        return alt.hconcat(left_chart, right_chart).resolve_scale(color='shared')

    layers = [base, player_line, *target_layers_left, *target_layers_right]
    if news_layer is not None:
        layers.append(news_layer)
    return alt.layer(*layers).properties(height=320)


def _event_has_economic_impact(econ: Economy, event_name: str) -> bool:
    if not event_name:
        return False
    event = next((e for e in econ.events if e.name == event_name), None)
    if event is None:
        return False
    for values in event.effects_schedule.values():
        if isinstance(values, list):
            if any(abs(v) > 1e-12 for v in values):
                return True
        elif abs(values) > 1e-12:
            return True
    return False

def _finish_game_if_needed() -> None:
    if st.session_state.in_term_quarter <= TERM_LENGTH:
        return

    st.session_state.game_over = True
    econ = st.session_state.economy
    term_end_idx = econ.current_quarter
    term_start_idx = max(0, term_end_idx - TERM_LENGTH)

    infl_term = econ.variables.get_history("inflation_rate")[term_start_idx:term_end_idx]
    unemp_term = econ.variables.get_history("unemployment_rate")[term_start_idx:term_end_idx]
    real_term = econ.variables.get_history("real_interest_rate")[term_start_idx:term_end_idx]

    term_events_raw = [
        e["name"]
        for e in st.session_state.news_log
        if e.get("in_term_quarter", 0) > 0
        and e["in_term_quarter"] <= TERM_LENGTH
        and _event_has_economic_impact(econ, e.get("name", ""))
    ]
    term_events = list(dict.fromkeys(term_events_raw))

    end_ctx = EndGameContext(
        mandate=st.session_state.mandate,
        initial_inflation=st.session_state.initial_inflation,
        initial_unemployment=st.session_state.initial_unemployment,
        dual_unemployment_target=st.session_state.dual_unemployment_target,
        inflation_history=infl_term,
        unemployment_history=unemp_term,
        real_interest_rate_history=real_term,
    )
    if hasattr(end_ctx, "term_event_names"):
        end_ctx.term_event_names = term_events

    message = build_end_of_term_message(end_ctx)
    st.session_state.end_message = message
    st.session_state.show_end_dialog = True


def _next_quarter(user_rate: float) -> None:
    econ = st.session_state.economy
    econ.adjust_interest_rate(float(user_rate))
    result = econ.simulate_quarter()

    st.session_state.latest_fired = bool(result.get("event_name"))
    if st.session_state.latest_fired:
        st.session_state.news_log.append({
            "quarter": econ.current_quarter - OFFSET,
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
        if c1.button("Continue Playing", width="stretch"):
            st.session_state.game_over = False
            st.session_state.show_end_dialog = False
            st.session_state.in_term_quarter = 1
            st.rerun()
        if c2.button("Retire", width="stretch"):
            st.session_state.show_end_dialog = False
            st.rerun()

    _dlg()


def _render_start_page() -> None:
  #  st.title(APP_TITLE)
    st.subheader("Start Menu")
    difficulty = st.radio("Difficulty", ["principles", "senior", "central_banker"], index=2, key="start_difficulty")
    scenario_name = st.radio("Scenario", SCENARIOS, index=0, key="start_scenario")
    mandate_label = st.radio("Mandate", list(MANDATES.keys()), index=0, key="start_mandate")
    if st.button("Start Game", type="primary"):
        _new_game(difficulty, scenario_name, MANDATES[mandate_label])
        st.rerun()


def main() -> None:
    st.set_page_config(page_title=APP_TITLE, layout="wide")
    st.markdown("""<style>.block-container {padding-top: 3rem;}</style>""", unsafe_allow_html=True)
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
        st.markdown("### News Feed")
        #top_panel_height = 220
        news_container = st.container(height=687, border=True)
        with news_container:
            if st.session_state.news_log:
                for idx, item in enumerate(list(reversed(st.session_state.news_log))):
                    color = "red" if idx == 0 and st.session_state.latest_fired else "inherit"
                    label = f"Q{item['quarter']}: {item['name']}"
                    st.markdown(f"<div style='color:{color};font-weight:600'>{label}</div>", unsafe_allow_html=True)
                    if item.get("detail"):
                        with st.expander(f"▶ Details", expanded=False):
                            st.write(item["detail"])
            else:
                st.write("No events yet.")

    with outer_right:
        st.markdown("### Economic Indicators")
       # indicators_container = st.container(height=top_panel_height, border=False)        
        c1, c2, c3 = st.columns(3)
        c1.markdown(f"**Inflation Rate:** {state['inflation_rate']:.2f}%")
        c2.markdown(f"**Unemployment Rate:** {state['unemployment_rate']:.2f}%")
        c3.markdown(f"**Interest Rate:** {state['interest_rate']:.2f}%")

        st.markdown("### Economic Graphs")
        graph_container = st.container(height=375, border=False)
        with graph_container:
            g1, g2, g3, g4 = st.columns(4)
            st.session_state.graph_window_mode = "past20" if g1.toggle("Past 20 turns", value=(st.session_state.graph_window_mode == "past20")) else "full"
            st.session_state.graph_split_mode = g2.toggle("Split charts", value=st.session_state.graph_split_mode)
            st.session_state.show_targets_on_graph = g3.toggle("Show targets", value=st.session_state.show_targets_on_graph)

            chart = _plot_histories(econ, st.session_state.graph_window_mode, st.session_state.graph_split_mode, st.session_state.show_targets_on_graph, st.session_state.mandate, st.session_state.dual_unemployment_target, st.session_state.latest_fired)
            #with g4:
             #   try:
              #      chart_png = _chart_png_bytes(chart)
               #     st.download_button("Download graph (PNG)", data=chart_png, file_name="economic_graph.png", mime="image/png", width="stretch")
                #except Exception:
                 #   chart_html = chart.to_html().encode("utf-8")
                  #  st.download_button("Download graph (HTML)", data=chart_html, file_name="economic_graph.html", mime="text/html", width="stretch")
            st.altair_chart(chart, width="stretch")

        st.markdown("##### New Interest Rate")
        if "rate_text" not in st.session_state:
            st.session_state.rate_text = f"{state['interest_rate']:.2f}"

        with st.form("policy_form", clear_on_submit=False):
            user_rate_text = st.text_input("New Interest Rate_invisible", value=st.session_state.rate_text, label_visibility="collapsed")
            submitted = st.form_submit_button("Next", type="primary", width="stretch", disabled=st.session_state.game_over)

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
