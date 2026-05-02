#!/usr/bin/env python3
"""Streamlit web UI for the Policy Interest Rate Simulator.

Faithful browser-oriented UX layer that reuses the existing simulation engine.
"""

import matplotlib.pyplot as plt
import streamlit as st

from economy import Economy
from endgame_logic import EndGameContext, build_end_of_term_message, mandate_text

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


def _new_game(difficulty: str, scenario_name: str, mandate: str) -> None:
    econ = Economy(difficulty="central_banker", scenario=_sample_scenario(scenario_name))
    econ.offset = OFFSET
    econ.player_start_turn = PLAYER_START_TURN

    news_log = []
    for _ in range(PLAYER_START_TURN + OFFSET):
        econ.adjust_interest_rate_with_taylor()
        result = econ.simulate_quarter()
        if result.get("event_name") and econ.current_quarter > OFFSET:
            user_q = max(1, econ.current_quarter - OFFSET)
            news_log.append(f"Q{user_q}: {result['event_name']}")

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


def _state_dict(econ: Economy) -> dict:
    return econ.get_state()


def _plot_histories(econ: Economy):
    inflation_history = econ.variables.get_history("inflation_rate")
    unemployment_history = econ.variables.get_history("unemployment_rate")
    interest_rate_history = econ.variables.get_history("interest_rate")

    fig, ax = plt.subplots(figsize=(10, 4.5))
    ax.plot(inflation_history, label="Inflation", color="red")
    ax.plot(unemployment_history, label="Unemployment", color="blue")
    ax.plot(interest_rate_history, label="Interest Rate", color="green", linestyle="--")
    ax.axvline(x=PLAYER_START_TURN + OFFSET, color="black", linestyle=":", label="Player start")
    ax.set_xlabel("Quarter")
    ax.set_ylabel("Percent")
    ax.legend(loc="best")
    ax.grid(alpha=0.2)
    fig.tight_layout()
    return fig


def _finish_game_if_needed() -> None:
    if st.session_state.player_turn <= TERM_LENGTH:
        return

    st.session_state.game_over = True
    econ = st.session_state.economy
    term_start_idx = max(0, PLAYER_START_TURN + OFFSET)
    term_end_idx = term_start_idx + TERM_LENGTH

    message = build_end_of_term_message(
        EndGameContext(
            mandate=st.session_state.mandate,
            initial_inflation=st.session_state.initial_inflation,
            initial_unemployment=st.session_state.initial_unemployment,
            dual_unemployment_target=st.session_state.dual_unemployment_target,
            inflation_history=econ.variables.get_history("inflation_rate")[term_start_idx:term_end_idx],
            unemployment_history=econ.variables.get_history("unemployment_rate")[term_start_idx:term_end_idx],
            real_interest_rate_history=econ.variables.get_history("real_interest_rate")[term_start_idx:term_end_idx],
            current_event_name=st.session_state.current_event_name,
        )
    )
    st.session_state.end_message = message


def _next_quarter(user_rate: float) -> None:
    econ = st.session_state.economy
    econ.adjust_interest_rate(float(user_rate))
    result = econ.simulate_quarter()

    if result.get("event_name"):
        st.session_state.news_log.append(f"Q{st.session_state.player_turn}: {result['event_name']}")
        st.session_state.news_log = st.session_state.news_log[-25:]
        st.session_state.current_event_name = result["event_name"]
        st.session_state.last_event_detail = result.get("event") or ""
    else:
        st.session_state.current_event_name = None
        st.session_state.last_event_detail = ""

    st.session_state.player_turn += 1
    _finish_game_if_needed()


def main() -> None:
    st.set_page_config(page_title=APP_TITLE, layout="wide")
    st.title(APP_TITLE)

    if "economy" not in st.session_state:
        _new_game("central_banker", "Random", "inflation_target")

    with st.sidebar:
        st.header("New game")
        difficulty = st.selectbox("Difficulty", ["principles", "senior", "central_banker"], index=2)
        scenario_name = st.selectbox("Scenario", SCENARIOS, index=0)
        mandate_label = st.radio("Mandate", list(MANDATES.keys()), index=0)
        if st.button("Start New Game", use_container_width=True):
            _new_game(difficulty, scenario_name, MANDATES[mandate_label])
            st.rerun()

    econ = st.session_state.economy
    state = _state_dict(econ)

    st.caption(
        mandate_text(
            st.session_state.mandate,
            st.session_state.dual_unemployment_target,
        )
    )

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Quarter", min(st.session_state.player_turn, TERM_LENGTH))
    c2.metric("Inflation", f"{state['inflation_rate']:.2f}%")
    c3.metric("Unemployment", f"{state['unemployment_rate']:.2f}%")
    c4.metric("Interest Rate", f"{state['interest_rate']:.2f}%")

    left, right = st.columns([2, 1])
    with left:
        st.subheader("Economic trends")
        st.pyplot(_plot_histories(econ), clear_figure=True)

    with right:
        st.subheader("Policy action")
        max_rate = max(30.0, state["interest_rate"] + 10)
        user_rate = st.number_input(
            "Set next-quarter interest rate (%)",
            min_value=0.0,
            max_value=max_rate,
            value=float(state["interest_rate"]),
            step=0.25,
        )

        if st.button("Next Quarter", type="primary", use_container_width=True, disabled=st.session_state.game_over):
            _next_quarter(user_rate)
            st.rerun()

        st.subheader("Latest event")
        if st.session_state.current_event_name:
            st.write(f"**{st.session_state.current_event_name}**")
            if st.session_state.last_event_detail:
                st.caption(st.session_state.last_event_detail)
        else:
            st.write("No major event this quarter.")

        st.subheader("News feed")
        if st.session_state.news_log:
            for item in reversed(st.session_state.news_log[-10:]):
                st.write(f"- {item}")
        else:
            st.write("No events yet.")

    if st.session_state.game_over:
        st.success("Term complete")
        st.write(st.session_state.end_message)


if __name__ == "__main__":
    main()
