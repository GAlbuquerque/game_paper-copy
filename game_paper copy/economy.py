#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from collections import defaultdict
from dataclasses import replace

import numpy as np
import pandas as pd

from events import initialize_events
from indicators import EconomicIndicators
from utils import (
    compute_real_interest_rate,
    effective_real_interest_rate,
    generate_shocks,
)
from variables import Variables


class Economy:
    EVENT_HORIZON = 8
    REAL_RATE_HISTORY_LENGTH = 10
    GAP_WEIGHTS = [3, 4, 5, 5, 10, 4, 3, 2, 1, 1, 0]

    def __init__(self, initial_state=None, difficulty="central_banker", scenario=None):
        self.difficulty = difficulty
        self.event_cooldown_quarters = self._difficulty_event_cooldown(difficulty)
        self.shock_sd_scale = self._difficulty_shock_scale(difficulty)
        self.simplified_dynamics = difficulty == "principles"
        self._initialize_runtime_state(initial_state)
        if scenario is not None:
            self.indicators = replace(self.indicators, **scenario)
        self._initialize_model_parameters()
        self._seed_real_rate_history()
        self.historical_gaps = [0] * 11
        self.historical_data = self._build_historical_frame()
        self.last_event_quarter = -10_000
        self.offset = 0
        self.player_start_turn = 40

    def _difficulty_event_cooldown(self, difficulty):
        return {
            "principles": 20,
            "senior": 10,
            "central_banker": 0,
        }.get(difficulty, 0)

    def _difficulty_shock_scale(self, difficulty):
        return {
            "principles": 0.1,
            "senior": 0.5,
            "central_banker": 1.0,
        }.get(difficulty, 1.0)

    def _initialize_runtime_state(self, initial_state):
        self.effect_queue = self._new_effect_queue()
        self.reputation = 0.8
        self.reputation_history = [self.reputation]
        self.indicators = (
            initial_state
            if initial_state
            else EconomicIndicators.generate_random_initial_state()
        )
        self.cb_persona = self._draw_cb_persona()
        self.interest_rate = max(float(np.random.normal(0.5, 2)), 0)
        self.current_quarter = 1
        self.max_quarters = 50
        self.variables = Variables()
        self.events = initialize_events()
        self.active_events = []
        self.past_events = []
        self._initialize_variables()

    def _initialize_model_parameters(self):
        self.beta1 = {
            "inflation": 1,
            "unemployment": 0.85,
            "natural_unemployment": 1,
            "real_rate_eq": 1,
        }

        self.correlation_matrix = np.array(
            [
                [1.0, 0.0, 0.1, 0.0],
                [0.0, 1.0, 0.2, 0.0],
                [0.1, 0.2, 1.0, 0.0],
                [0.0, 0.0, 0.0, 1.0],
            ]
        )
        self.std_devs = np.array([0.3, 0.5, 0.05, 0.1])

    def _seed_real_rate_history(self):
        self.real_interest_rates = [0.5]
        for _ in range(self.REAL_RATE_HISTORY_LENGTH - 1):
            self.real_interest_rates.append(
                self.real_interest_rates[-1] + np.random.normal(0, 0.25)
            )

    def _build_historical_frame(self):
        return pd.DataFrame(
            {
                "Inflation": [self.indicators.inflation_rate],
                "Real_Interest_Rate": [self.real_interest_rates[0]],
                "Unemployment_Rate": [self.indicators.unemployment_rate],
            }
        )

    def _new_effect_queue(self):
        return [defaultdict(float) for _ in range(self.EVENT_HORIZON)]

    def _draw_cb_persona(self):
        r = np.random.rand()
        if r < 0.50:
            return "good"
        if r < 0.75:
            return "hawk"
        if r < 0.95:
            return "dove"
        return "careless"

    def _initialize_variables(self):
        self.variables.update("inflation_rate", self.indicators.inflation_rate)
        self.variables.update("unemployment_rate", self.indicators.unemployment_rate)
        self.variables.update(
            "natural_unemployment_rate",
            self.indicators.natural_unemployment_rate,
        )
        self.variables.update("interest_rate", self.interest_rate)
        self.variables.update(
            "real_interest_rate",
            compute_real_interest_rate(
                self.interest_rate,
                self.indicators.inflation_rate,
            ),
        )
        self.variables.update(
            "unemployment_gap",
            self.indicators.unemployment_rate
            - self.indicators.natural_unemployment_rate,
        )
        self.variables.update("cb_reputation", self.reputation)

    def update_reputation(self, prev_inflation, new_inflation, unemployment, real_rate):
        delta = 0.0
        if new_inflation < 2:
            delta += 0.02
        if new_inflation < prev_inflation:
            delta += 0.02
        if (real_rate > 4) and (unemployment > 10):
            delta += 0.10

        if new_inflation > 6:
            delta -= 0.05
        if (prev_inflation > 2) and (new_inflation > prev_inflation):
            delta -= 0.025
        if (real_rate < 2) and (prev_inflation > 6):
            delta -= 0.05

        self.reputation = float(min(1.0, max(0.0, self.reputation + delta)))

    def simulate_quarter(self):
        shocks = generate_shocks(
            self.correlation_matrix,
            self.std_devs * self.shock_sd_scale,
        )
        history = self._build_history_snapshot()
        event_description, event_name, names = self._select_and_queue_event(history)
        self._record_past_events(names)
        self._apply_current_event_slice()
        rate_effect, gap_effect = self._run_core_model(shocks)
        self.current_quarter += 1

        result = {
            "event": event_description,
            "event_name": event_name,
            "rate_effect": rate_effect,
            "gap_effect": gap_effect,
            "shocks": shocks.tolist(),
        }
        self._ignore_difficulty = False
        return result

    def _build_history_snapshot(self):
        q_user = self.current_quarter - getattr(self, "offset", 0)
        return {
            "inflation_rate": self.variables.get_history("inflation_rate"),
            "interest_rate": self.variables.get_history("interest_rate"),
            "real_rate_eq": self.real_interest_rates[:],
            "unemployment_rate": self.variables.get_history("unemployment_rate"),
            "natural_unemployment_rate": self.variables.get_history(
                "natural_unemployment_rate"
            ),
            "reputation_history": self.reputation_history[:],
            "past_events": self.past_events[:],
            "quarter_user": q_user,
        }

    def _select_and_queue_event(self, history):
        event_description = None
        event_name = None
        names = []
        event = self.check_events(history)
        if event is not None:
            event_description = event.description
            event_name = event.name
            names.append(event.name)
            self.enqueue_event(event)
        return event_description, event_name, names

    def _record_past_events(self, names):
        if not hasattr(self, "past_events"):
            self.past_events = []
        self.past_events.append(names)
        self.past_events = self.past_events[-8:]

    def _apply_current_event_slice(self):
        if not hasattr(self, "effect_queue"):
            self.effect_queue = self._new_effect_queue()

        current_slice = dict(self.effect_queue[0])
        self.apply_event_effects(current_slice)
        self.effect_queue.pop(0)
        self.effect_queue.append(defaultdict(float))

    def _run_core_model(self, shocks):
        self._append_real_rate_history()
        if self.simplified_dynamics:
            eff_real_rate = self.real_interest_rates[-1] if self.real_interest_rates else 0.0
        else:
            eff_real_rate = effective_real_interest_rate(self.real_interest_rates)
        
        
        rate_effect = self._compute_rate_effect(eff_real_rate)

        new_natural_unemployment = self._compute_natural_unemployment(shocks)
        new_unemployment = self._compute_unemployment(
            new_natural_unemployment,
            eff_real_rate,
            shocks,
        )

        reputation = self.reputation
        # Likely intent issue preserved for equivalence:
        # history records the pre-update reputation each quarter.
        # Intended alternative:
        # self.reputation_history.append(self.reputation)  # after update_reputation(...)
        self.reputation_history.append(self.reputation)
        gap_effect = self.compute_gap_effect()
        new_inflation = self._compute_inflation(
            eff_real_rate,
            gap_effect,
            shocks,
            reputation,
        )

        prev_inflation = self._get_previous_inflation()
        self._commit_indicator_updates(
            new_inflation,
            new_unemployment,
            new_natural_unemployment,
            prev_inflation,
        )
        self._record_post_update_histories()
        return rate_effect, gap_effect

    def _append_real_rate_history(self):
        new_real_rate = compute_real_interest_rate(
            self.interest_rate,
            self.indicators.inflation_rate,
        )
        self.real_interest_rates.append(new_real_rate)
        if len(self.real_interest_rates) > self.REAL_RATE_HISTORY_LENGTH:
            self.real_interest_rates.pop(0)


    def _compute_natural_unemployment(self, shocks):
        drift_correction = (self.indicators.natural_unemployment_rate - 5) * (-0.02)
        return (
            self.beta1["natural_unemployment"]
            * self.indicators.natural_unemployment_rate
            + shocks[2]
            + drift_correction
        )

    def _compute_unemployment(self, new_natural_unemployment, eff_real_rate, shocks):
            
        rate_effect = max(
            min((eff_real_rate - self.indicators.real_rate_eq) * 0.3, 4),
            -1.5,
        )
        
        new_unemployment = (
            self.beta1["unemployment"] * new_natural_unemployment
            + (1 - self.beta1["unemployment"]) * self.indicators.unemployment_rate
            +rate_effect 
            + shocks[1]
        )
        
        if new_unemployment < self.indicators.unemployment_rate:
            decrease = self.indicators.unemployment_rate - new_unemployment
            new_unemployment = self.indicators.unemployment_rate - (0.5 * decrease)
            
        
        new_unemployment = max( min (new_unemployment, 99), 1)

        return new_unemployment

    def _compute_inflation(self, eff_real_rate, gap_effect, shocks, reputation):
            
        rate_effect_inflation = min(
            max((eff_real_rate - self.indicators.real_rate_eq) * (-0.1), -2),
            0.5,
        )
        anchor = 2.0
        sens = max(self.indicators.inflation_rate / 10, 1)
        adaptive_beta = min(max(0.0, 1.0 - 0.2 * reputation), 1)
        inflation_persistence = self.beta1["inflation"]
        #if self.simplified_dynamics:
            #inflation_persistence = 0.35
            #gap_effect *= 0.4
        adaptive_term = (
            adaptive_beta
            * inflation_persistence
            * self.indicators.inflation_rate
        )
        drift = (1 - adaptive_beta) * anchor

        
        new_inflation = (
            adaptive_term
            + drift
            + shocks[0] * sens
            + min(gap_effect *sens, 0.1*max(self.indicators.inflation_rate,1))
            + rate_effect_inflation*sens
        )

        if new_inflation < 0 and self.indicators.inflation_rate > 10:
            new_inflation = self.indicators.inflation_rate / 2

        return new_inflation

    def _get_previous_inflation(self):
        inflation_history = self.variables.get_history("inflation_rate")
        if inflation_history:
            return inflation_history[-1]
        return self.indicators.inflation_rate

    def _commit_indicator_updates(
        self,
        new_inflation,
        new_unemployment,
        new_natural_unemployment,
        prev_inflation,
    ):
        self.indicators.inflation_rate = max(new_inflation, -99)
        self.indicators.unemployment_rate = new_unemployment
        self.indicators.natural_unemployment_rate = max(
            2.0,
            new_natural_unemployment,
        )

        real_rate_actual = compute_real_interest_rate(
            self.interest_rate,
            self.indicators.inflation_rate,
        )
        self.update_reputation(
            prev_inflation,
            self.indicators.inflation_rate,
            self.indicators.unemployment_rate,
            real_rate_actual,
        )

    def _record_post_update_histories(self):
        self._initialize_variables()
        current_gap = (
            self.indicators.unemployment_rate
            - self.indicators.natural_unemployment_rate
        )
        self.historical_gaps.append(current_gap)
        if len(self.historical_gaps) > 6:
            self.historical_gaps.pop(0)
        self.update_historical_data()

    def compute_gap_effect(self):
        total_weight = sum(self.GAP_WEIGHTS)
        normalized_weights = [weight / total_weight for weight in self.GAP_WEIGHTS]

        if len(self.historical_gaps) < 11:
            raise ValueError("Not enough historical gaps to compute weighted average")

        weighted_gap = sum(
            weight * gap
            for weight, gap in zip(normalized_weights, self.historical_gaps[-11:-1])
        )
        if self.simplified_dynamics:
            weighted_gap = self.historical_gaps[-1]

        if weighted_gap >= 0:
            gap_effect = -0.1 * weighted_gap

        else:
            natural_rate = self.indicators.natural_unemployment_rate
            unemployment_rate = self.indicators.unemployment_rate
            #inflation_rate = self.indicators.inflation_rate
            denom = unemployment_rate + 1
            if abs(denom) < 1e-9:
                denom = 1e-9 if denom >= 0 else -1e-9
            gap_effect = (0.2 * (natural_rate / denom) + 0.1) * (-weighted_gap)
        
        return gap_effect

    def update_historical_data(self):
        new_data = pd.DataFrame(
            {
                "Inflation": [self.indicators.inflation_rate],
                "Real_Interest_Rate": [self.real_interest_rates[-1]],
                "Unemployment_Rate": [self.indicators.unemployment_rate],
            }
        )
        self.historical_data = pd.concat(
            [self.historical_data, new_data],
            ignore_index=True,
        )

    def _recent_fiscal_event_count(self, within=4):
        fiscal_names = {"Fiscal Deficit", "Spending Wave", "Fiscal Surplus"}
        window = self.past_events[-within:] if hasattr(self, "past_events") else []
        count = 0
        for quarter_events in window:
            if isinstance(quarter_events, list):
                count += sum(1 for name in quarter_events if name in fiscal_names)
            elif quarter_events in fiscal_names:
                count += 1
        return count

    def check_events(self, history):
        inflation = history.get("inflation_rate", [0.0])[-1]
        unemployment = history.get("unemployment_rate", [0.0])[-1]
        natural_unemployment = history.get("natural_unemployment_rate", [0.0])[-1]

        # Cooperative fiscal policy events are only active on player turns
        # and only for principles difficulty.
        player_turn = history.get("quarter_user", 0) > getattr(self, "player_start_turn", 40)
        allow_coop_fiscal = self.difficulty == "principles" and player_turn

        if allow_coop_fiscal and self._recent_fiscal_event_count(within=4) == 0:
            if inflation < 0 and unemployment > natural_unemployment:
                target_name = (
                    "Fiscal Deficit" if np.random.rand() < 0.5 else "Spending Wave"
                )
                for event in self.events:
                    if event.name == target_name:
                        self.last_event_quarter = self.current_quarter
                        return event
            if inflation > 10 and np.random.rand() < 0.5:
                for event in self.events:
                    if event.name == "Fiscal Surplus":
                        self.last_event_quarter = self.current_quarter
                        return event

        if self.event_cooldown_quarters > 0:
            if (self.current_quarter - self.last_event_quarter) < self.event_cooldown_quarters:
                return None
        fired = []
        for event in self.events:
            allowed = getattr(event, "allowed_difficulties", None)
            if allowed is not None and self.difficulty not in allowed:
                continue
            get_probability = getattr(event, "get_probability", None)
            probability = (
                float(get_probability(history))
                if callable(get_probability)
                else float(getattr(event, "probability", 0.0))
            )
            if np.random.rand() < max(0.0, min(1.0, probability)):
                fired.append(event)

        if not fired:
            return None
        chosen = np.random.choice(fired)
        self.last_event_quarter = self.current_quarter
        return chosen

    def enqueue_event(self, event):
        for indicator, sequence in event.effects_schedule.items():
            for quarter in range(min(self.EVENT_HORIZON, len(sequence))):
                self.effect_queue[quarter][indicator] += float(
                    sequence[quarter] or 0.0
                )

    def apply_event_effects(self, effects):
        agg = defaultdict(float)
        if isinstance(effects, list):
            for effect_dict in effects:
                for key, value in (effect_dict or {}).items():
                    agg[key] += float(value or 0.0)
        else:
            for key, value in (effects or {}).items():
                agg[key] += float(value or 0.0)

        self.indicators.inflation_rate += agg.get("inflation", 0.0)
        self.interest_rate += agg.get("interest_rate", 0.0)

        self.indicators.real_rate_eq += agg.get("real_rate_eq", 0.0)

        self.indicators.unemployment_rate += agg.get("unemployment", 0.0)
        self.indicators.natural_unemployment_rate += agg.get(
            "natural_unemployment",
            0.0,
        )

    def adjust_interest_rate(self, new_rate):
        self.interest_rate = float(new_rate)

    def adjust_interest_rate_with_taylor(self) -> float:
        old_rate = self.interest_rate
        taylor_rate = self.calculate_taylor_rule()

        if abs(taylor_rate - old_rate) < 0.5:
            new_rate = old_rate

        if taylor_rate > old_rate + 0.5:
            new_rate = old_rate + 0.25

        if taylor_rate > old_rate + 1:
            new_rate = old_rate + 0.5

        if (
            taylor_rate > old_rate + 1
            and self.indicators.inflation_rate > 10
            and self.indicators.unemployment_rate <= 10
        ):
            new_rate = int(self.indicators.inflation_rate * 1.5 + 5)

        if taylor_rate < old_rate - 0.5:
            new_rate = old_rate - 0.25

        if taylor_rate < old_rate - 1:
            new_rate = old_rate - 0.5

        # Likely intent issue preserved for equivalence:
        # this else is attached only to the unemployment/inflation special case
        # just below it, so the rounded Taylor rate overwrites most stepwise
        # branches above.
        # Intended alternative sketch:
        # elif abs(taylor_rate - old_rate) < 0.5:
        #     new_rate = old_rate
        if self.indicators.unemployment_rate > 6 and self.indicators.inflation_rate < 1:
            new_rate = 0
        else:
            new_rate = round(taylor_rate * 4) / 4

        new_rate = min(max(new_rate, 0), old_rate * 9 + 10)
        self.adjust_interest_rate(new_rate)
        return new_rate

    def calculate_taylor_rule(self):
        inflation = self.indicators.inflation_rate
        unemployment = self.indicators.unemployment_rate
        natural_unemployment = self.indicators.natural_unemployment_rate
        natural_rate = self.indicators.real_rate_eq

        if self.cb_persona == "good":
            return (
                natural_rate 
                + inflation
                + 0.5 * (inflation - 2)
                + 0.5 * (natural_unemployment - unemployment)
            )
        if self.cb_persona == "dove":
            return (
                (natural_rate - 1)
                + inflation
                + 0.1 * (inflation - 4)
                + 0.9 * (natural_unemployment - unemployment)
            )
        if self.cb_persona == "hawk":
            return (
                (natural_rate + 1) 
                + inflation
                + 0.9 * (inflation - 1.5)
                + 0.1 * (natural_unemployment - unemployment)
            )
        return (
            (natural_rate -  1) 
            + inflation
            + 0.05 * (inflation - 6)
            + 0.95 * (natural_unemployment - 3 - unemployment)
        )

    def get_state(self):
        return self.variables.values

    def plot_graph(self):
        from visualization import plot_economic_indicators

        plot_economic_indicators(self.variables)
