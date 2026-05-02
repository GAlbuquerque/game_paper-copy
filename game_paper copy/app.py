#!/usr/bin/env python3
"""Streamlit web UI for the Policy Interest Rate Simulator.

Faithful browser-oriented UX layer that reuses the existing simulation engine.
"""

import io
import matplotlib.pyplot as plt
import streamlit as st

from economy import Economy
from endgame_logic import EndGameContext, build_end_of_term_message, mandate_text, mandate_targets

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
    # main_gui3 currently maps these names to None and applies behavior via bootstrap.
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


def _apply_bootstrap_overrides_before_turn(econ: Economy, scenario_name: str, idx: int, total_turns: int) -> None:
    if scenario_name == "Stable Economy" and idx >= total_turns - 10:
        econ.last_event_quarter = econ.current_quarter


def _apply_bootstrap_overrides_after_turn(econ: Economy, scenario_name: str, idx: int, total_turns: int) -> None:
    if scenario_name == "Depression" and idx == total_turns - 3:
        econ.indicators.unemployment_rate = max(econ.indicators.unemployment_rate, 12.0)
        econ.indicators.inflation_rate = max(0.5, econ.indicators.inflation_rate - 1.0)
        econ._initialize_variables()

    if scenario_name == "Stagflation" and idx == total_turns - 3:
        econ.indicators.inflation_rate += 2.0
        econ.indicators.unemployment_rate += 1.2
        econ._initialize_variables()


def _new_game(difficulty: str, scenario_name: str, mandate: str) -> None:
    econ = Economy(difficulty="central_banker", scenario=_sample_scenario(scenario_name))
    econ.offset = OFFSET
    econ.player_start_turn = PLAYER_START_TURN
    _apply_scenario_initial_conditions(econ, scenario_name)

    news_log = []
    total_turns = PLAYER_START_TURN + OFFSET
    _apply_bootstrap_persona(econ, scenario_name)
    for idx in range(total_turns):
        _apply_bootstrap_overrides_before_turn(econ, scenario_name, idx, total_turns)
        econ.adjust_interest_rate_with_taylor()
        result = econ.simulate_quarter()
        _apply_bootstrap_overrides_after_turn(econ, scenario_name, idx, total_turns)
        if result.get("event_name") and econ.current_quarter > OFFSET:
            news_log.append(f"Quarter {econ.current_quarter}: {result['event_name']}")

    _activate_player_difficulty(econ, difficulty)

    unemployment_history = econ.variables.get_history("unemployment_rate")
    sample = unemployment_history[-10:] if len(unemployment_history) >= 10 else unemployment_history
    dual_target = int(round(sum(sample) / len(sample))) if len(sample) >= 10 else 5

    st.session_state.economy = econ
    st.session_state.news_log = news_log[-25:]
    st.session_state.game_over = False
    st.session_state.player_turn = 1
    st.session_state.current_event_name = None
    st.session_state.initial_inflation = econ.indicators.inflation_rate
    st.session_state.initial_unemployment = econ.indicators.unemployment_rate
    st.session_state.difficulty = difficulty
    st.session_state.scenario_name = scenario_name
    st.session_state.mandate = mandate
    st.session_state.dual_unemployment_target = dual_target
    st.session_state.last_event_detail = ""
    st.session_state.end_message = ""
    st.session_state.graph_window_mode = "full"
    st.session_state.graph_split_mode = False
    st.session_state.show_targets_on_graph = False
    st.session_state.end_summary = None
    st.session_state.game_started = True
    st.session_state.show_end_dialog = False


def _state_dict(econ: Economy) -> dict:
    return econ.get_state()


def _rate_change_requires_confirmation(econ: Economy, new_rate: float) -> bool:
    current_rate = econ.interest_rate
    current_inflation = econ.indicators.inflation_rate
    return (new_rate > current_rate * 9) and (new_rate > current_inflation + 10)


def _validate_rate_input(new_rate: float) -> tuple[bool, str]:
    if new_rate < 0:
        return False, "Interest rate cannot be negative."
    return True, ""


def _plot_histories(econ: Economy, window_mode: str, split_mode: bool, show_targets: bool, mandate: str, dual_unemployment_target: int):
    inflation_history = econ.variables.get_history("inflation_rate")
    unemployment_history = econ.variables.get_history("unemployment_rate")
    interest_rate_history = econ.variables.get_history("interest_rate")

    if window_mode == "past20":
        start_idx = max(0, len(inflation_history) - 20)
    else:
        start_idx = 0

    x = list(range(start_idx, len(inflation_history)))
    infl = inflation_history[start_idx:]
    unemp = unemployment_history[start_idx:]
    rate = interest_rate_history[start_idx:]

    if split_mode:
        fig, axes = plt.subplots(2, 1, figsize=(6, 4), dpi=80, sharex=True)
        axes[0].plot(x, infl, color="red", label="Inflation")
        axes[0].plot(x, rate, color="green", linestyle="--", label="Interest Rate")
        axes[1].plot(x, unemp, color="blue", label="Unemployment")
        natural = econ.variables.get_history("natural_unemployment_rate")[start_idx:]
        if econ.difficulty == "principles":
            axes[1].plot(x, natural, color="black", linestyle=":", label="Natural unemployment")

        for ax in axes:
            ax.axvline(x=PLAYER_START_TURN + OFFSET, color="black", linestyle=":")
            ax.grid(alpha=0.2)
            ax.legend(loc="best")

        axes[1].set_xlabel("Quarter")
        axes[0].set_ylabel("Percent")
        axes[1].set_ylabel("Percent")
        if show_targets:
            t = mandate_targets(mandate, dual_unemployment_target)
            axes[0].axhline(t["inflation"], color="red", linestyle=':', alpha=0.6)
            if t["unemployment"] is not None:
                axes[1].axhline(t["unemployment"], color="blue", linestyle=':', alpha=0.6)
    else:
        fig, ax = plt.subplots(figsize=(6, 4), dpi=80)
        ax.plot(x, infl, label="Inflation", color="red")
        ax.plot(x, unemp, label="Unemployment", color="blue")
        ax.plot(x, rate, label="Interest Rate", color="green", linestyle="--")
        ax.axvline(x=PLAYER_START_TURN + OFFSET, color="black", linestyle=":", label="Player start")
        ax.set_xlabel("Quarter")
        ax.set_ylabel("Percent")
        ax.legend(loc="best")
        ax.grid(alpha=0.2)
        if show_targets:
            t = mandate_targets(mandate, dual_unemployment_target)
            ax.axhline(t["inflation"], color="red", linestyle=':', alpha=0.6, label="Inflation target")
            if t["unemployment"] is not None:
                ax.axhline(t["unemployment"], color="blue", linestyle=':', alpha=0.6, label="Unemployment target")
    fig.tight_layout()
    return fig


def _finish_game_if_needed() -> None:
    if st.session_state.player_turn <= TERM_LENGTH:
        return

    st.session_state.game_over = True
    econ = st.session_state.economy
    term_start_idx = max(0, PLAYER_START_TURN + OFFSET)
    term_end_idx = term_start_idx + TERM_LENGTH

    infl_term = econ.variables.get_history("inflation_rate")[term_start_idx:term_end_idx]
    unemp_term = econ.variables.get_history("unemployment_rate")[term_start_idx:term_end_idx]
    real_term = econ.variables.get_history("real_interest_rate")[term_start_idx:term_end_idx]

    message = build_end_of_term_message(
        EndGameContext(
            mandate=st.session_state.mandate,
            initial_inflation=st.session_state.initial_inflation,
            initial_unemployment=st.session_state.initial_unemployment,
            dual_unemployment_target=st.session_state.dual_unemployment_target,
            inflation_history=infl_term,
            unemployment_history=unemp_term,
            real_interest_rate_history=real_term,
            current_event_name=st.session_state.current_event_name,
        )
    )
    st.session_state.end_message = message

    targets = mandate_targets(st.session_state.mandate, st.session_state.dual_unemployment_target)
    avg_infl = sum(infl_term) / max(1, len(infl_term))
    avg_unemp = sum(unemp_term) / max(1, len(unemp_term))
    st.session_state.end_summary = {
        "avg_inflation": avg_infl,
        "avg_unemployment": avg_unemp,
        "inflation_target": targets["inflation"],
        "unemployment_target": targets["unemployment"],
        "inflation_hit": abs(avg_infl - targets["inflation"]) <= 1.0,
        "unemployment_hit": (targets["unemployment"] is None) or (abs(avg_unemp - targets["unemployment"]) <= 1.0),
    }
    st.session_state.show_end_dialog = True


def _next_quarter(user_rate: float) -> None:
    econ = st.session_state.economy
    econ.adjust_interest_rate(float(user_rate))
    result = econ.simulate_quarter()

    if result.get("event_name"):
        st.session_state.news_log.append(f"Quarter {econ.current_quarter}: {result['event_name']}")
        st.session_state.news_log = st.session_state.news_log[-25:]
        st.session_state.current_event_name = result["event_name"]
        st.session_state.last_event_detail = result.get("event") or ""
    else:
        st.session_state.current_event_name = None
        st.session_state.last_event_detail = ""

    st.session_state.player_turn += 1
    _finish_game_if_needed()




def _figure_png_bytes(fig) -> bytes:
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=10, bbox_inches="tight")
    buf.seek(0)
    return buf.getvalue()


def _render_end_dialog() -> None:
    if not st.session_state.get("show_end_dialog", False):
        return

    @st.dialog("End of Game")
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

    with st.expander("New game controls", expanded=False):
        cng1, cng2, cng3, cng4 = st.columns([1,1,1,1])
        difficulty = cng1.radio("Difficulty", ["principles", "senior", "central_banker"], index=2, horizontal=False)
        scenario_name = cng2.radio("Scenario", SCENARIOS, index=0, horizontal=False)
        mandate_label = cng3.radio("Mandate", list(MANDATES.keys()), index=0, horizontal=False)
        if cng4.button("Back to Start Menu", use_container_width=True):
            st.session_state.game_started = False
            st.rerun()
        if cng4.button("Start New Game", use_container_width=True):
            _new_game(difficulty, scenario_name, MANDATES[mandate_label])
            st.rerun()

    econ = st.session_state.economy
    term_start_idx = max(0, PLAYER_START_TURN + OFFSET)
    term_end_idx = term_start_idx + TERM_LENGTH

    infl_term = econ.variables.get_history("inflation_rate")[term_start_idx:term_end_idx]
    unemp_term = econ.variables.get_history("unemployment_rate")[term_start_idx:term_end_idx]
    real_term = econ.variables.get_history("real_interest_rate")[term_start_idx:term_end_idx]

    message = build_end_of_term_message(
        EndGameContext(
            mandate=st.session_state.mandate,
            initial_inflation=st.session_state.initial_inflation,
            initial_unemployment=st.session_state.initial_unemployment,
            dual_unemployment_target=st.session_state.dual_unemployment_target,
            inflation_history=infl_term,
            unemployment_history=unemp_term,
            real_interest_rate_history=real_term,
            current_event_name=st.session_state.current_event_name,
        )
    )
    st.session_state.end_message = message

    targets = mandate_targets(st.session_state.mandate, st.session_state.dual_unemployment_target)
    avg_infl = sum(infl_term) / max(1, len(infl_term))
    avg_unemp = sum(unemp_term) / max(1, len(unemp_term))
    st.session_state.end_summary = {
        "avg_inflation": avg_infl,
        "avg_unemployment": avg_unemp,
        "inflation_target": targets["inflation"],
        "unemployment_target": targets["unemployment"],
        "inflation_hit": abs(avg_infl - targets["inflation"]) <= 1.0,
        "unemployment_hit": (targets["unemployment"] is None) or (abs(avg_unemp - targets["unemployment"]) <= 1.0),
    }
    st.session_state.show_end_dialog = True


def _next_quarter(user_rate: float) -> None:
    econ = st.session_state.economy
    econ.adjust_interest_rate(float(user_rate))
    result = econ.simulate_quarter()

    if result.get("event_name"):
        st.session_state.news_log.append(f"Quarter {econ.current_quarter}: {result['event_name']}")
        st.session_state.news_log = st.session_state.news_log[-25:]
        st.session_state.current_event_name = result["event_name"]
        st.session_state.last_event_detail = result.get("event") or ""
    else:
        st.session_state.current_event_name = None
        st.session_state.last_event_detail = ""

    st.session_state.player_turn += 1
    _finish_game_if_needed()




def _figure_png_bytes(fig) -> bytes:
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=180, bbox_inches="tight")
    buf.seek(0)
    return buf.getvalue()


def _render_end_dialog() -> None:
    if not st.session_state.get("show_end_dialog", False):
        return

    @st.dialog("End of Game")
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

 #   with st.expander("Game menu", expanded=False):
  #      g1, g2, g3, g4 = st.columns([1,1,1,1])
   #     difficulty = g1.radio("Difficulty", ["principles", "senior", "central_banker"], index=2)
    #    scenario_name = g2.radio("Scenario", SCENARIOS, index=0)
     #   mandate_label = g3.radio("Mandate", list(MANDATES.keys()), index=0)
      #  if g4.button("Back to Start Menu", use_container_width=True):
       #     st.session_state.game_started = False
        #    st.rerun()
       # if g4.button("Start New Game", use_container_width=True):
        #    _new_game(difficulty, scenario_name, MANDATES[mandate_label])
         #   st.rerun()

    econ = st.session_state.economy
    state = _state_dict(econ)

    st.markdown("### Economic Indicators")
    c1, c2, c3 = st.columns(3)
    c1.markdown(f"**Inflation Rate:** {state['inflation_rate']:.2f}%")
    c2.markdown(f"**Unemployment Rate:** {state['unemployment_rate']:.2f}%")
    c3.markdown(f"**Interest Rate:** {state['interest_rate']:.2f}%")

    if st.session_state.game_over:
        st.success("Term complete")
        st.write(st.session_state.end_message)
        if st.session_state.end_summary:
            ssum = st.session_state.end_summary
            st.markdown("### End-of-term scorecard")
            c1, c2 = st.columns(2)
            c1.metric("Avg inflation (term)", f"{ssum['avg_inflation']:.2f}%")
            c2.metric("Inflation target", f"{ssum['inflation_target']:.2f}%")
            if ssum["unemployment_target"] is not None:
                c3, c4 = st.columns(2)
                c3.metric("Avg unemployment (term)", f"{ssum['avg_unemployment']:.2f}%")
                c4.metric("Unemployment target", f"{ssum['unemployment_target']:.2f}%")

            st.write(f"Inflation objective: {'met' if ssum['inflation_hit'] else 'missed'}")
            if ssum["unemployment_target"] is not None:
                st.write(f"Unemployment objective: {'met' if ssum['unemployment_hit'] else 'missed'}")
                
    st.markdown("### Economic Graphs")
    left_col, right_col = st.columns([2.1, 1.1])
    with left_col:
        #st.subheader("Economic trends")
        g1, g2, g3 = st.columns(3)
        past20 = g1.toggle("Past 20 turns", value=(st.session_state.graph_window_mode == "past20"))
        st.session_state.graph_window_mode = "past20" if past20 else "full"
        st.session_state.graph_split_mode = g2.toggle("Split charts", value=st.session_state.graph_split_mode)
        st.session_state.show_targets_on_graph = g3.toggle("Show targets", value=st.session_state.show_targets_on_graph)

        fig = _plot_histories(
            econ,
            st.session_state.graph_window_mode,
            st.session_state.graph_split_mode,
            st.session_state.show_targets_on_graph,
            st.session_state.mandate,
            st.session_state.dual_unemployment_target,
        )
        st.pyplot(fig, clear_figure=False)
        st.download_button("Download graph (PNG)", data=_figure_png_bytes(fig), file_name="pirs_graph.png", mime="image/png")

    with right_col:
        st.markdown("### Latest event")
        if st.session_state.current_event_name:
            st.write(f"**{st.session_state.current_event_name}**")
            if st.session_state.last_event_detail:
                st.caption(st.session_state.last_event_detail)
        else:
            st.write("No major event this quarter.")

        st.markdown("### News Feed")
        if st.session_state.news_log:
            for item in st.session_state.news_log[-12:]:
                st.write(f"- {item}")
        else:
            st.write("No events yet.")

    st.markdown("### Policy action")
    if "rate_text" not in st.session_state:
        st.session_state.rate_text = f"{state['interest_rate']:.2f}"

    with st.form("policy_form", clear_on_submit=False):
        user_rate_text = st.text_input("Enter New Interest Rate", value=st.session_state.rate_text)
        parsed_rate = None
        try:
            parsed_rate = float(user_rate_text)
        except ValueError:
            pass

        needs_confirm = False
        if parsed_rate is not None:
            needs_confirm = _rate_change_requires_confirmation(econ, parsed_rate)
        if needs_confirm:
            st.warning("This is a very large increase relative to current conditions.")
            confirm_large_jump = st.checkbox("I confirm this large rate increase")
        else:
            confirm_large_jump = True

        submitted = st.form_submit_button("Next", type="primary", use_container_width=True, disabled=st.session_state.game_over)

    if submitted:
        st.session_state.rate_text = user_rate_text
        try:
            user_rate = float(user_rate_text)
        except ValueError:
            st.error("Please enter a valid number for the interest rate.")
            user_rate = None

        if user_rate is not None:
            ok, msg = _validate_rate_input(user_rate)
            if not ok:
                st.error(msg)
            elif _rate_change_requires_confirmation(econ, user_rate) and not confirm_large_jump:
                st.error("Please confirm the large rate increase before proceeding.")
            else:
                _next_quarter(user_rate)
                st.session_state.rate_text = f"{st.session_state.economy.interest_rate:.2f}"
                st.rerun()





if __name__ == "__main__":
    main()
