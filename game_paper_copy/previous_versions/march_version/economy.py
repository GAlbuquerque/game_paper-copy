#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import numpy as np
import pandas as pd
import statsmodels.api as sm
from indicators import EconomicIndicators
from events import GameEvent, initialize_events
from variables import Variables
from utils import generate_shocks, compute_real_interest_rate, effective_real_interest_rate

class Economy:
    def __init__(self, initial_state=None):
        self.indicators = initial_state if initial_state else EconomicIndicators.generate_random_initial_state()
        self.interest_rate = 4.5
        self.current_quarter = 1
        self.max_quarters = 50
        self.variables = Variables()
        self.events = initialize_events()

        self._initialize_variables()

        self.beta1 = {"inflation": 1, "unemployment": 0.9, "natural_unemployment": 1}

        self.correlation_matrix = np.array([
            [1.0, 0.0, 0.1],
            [0.0, 1.0, 0.2],
            [0.1, 0.2, 1.0]
        ])
        self.std_devs = np.array([0.3, 0.1, 0.05])

        self.real_interest_rates = [0.5]
        for _ in range(9):
            self.real_interest_rates.append(
                self.real_interest_rates[-1]
                + np.random.normal(0, 0.25)
            )

        self.historical_gaps = [0] * 11

        self.historical_data = pd.DataFrame({
            'Inflation': [self.indicators.inflation_rate],
            'Real_Interest_Rate': [self.real_interest_rates[0]],
            'Unemployment_Rate': [self.indicators.unemployment_rate]
        })

    def _initialize_variables(self):
        self.variables.update("inflation_rate", self.indicators.inflation_rate)
        self.variables.update("unemployment_rate", self.indicators.unemployment_rate)
        self.variables.update("natural_unemployment_rate", self.indicators.natural_unemployment_rate)
        self.variables.update("interest_rate", self.interest_rate)
        self.variables.update("real_interest_rate", compute_real_interest_rate(self.interest_rate, self.indicators.inflation_rate))
        self.variables.update("unemployment_gap",
                              self.indicators.unemployment_rate - self.indicators.natural_unemployment_rate)

    def simulate_quarter(self):
        shocks = generate_shocks(self.correlation_matrix, self.std_devs)
        event = self.check_events()
        event_description = None
        event_name = None
        active_events = []
        
        inflation_history = self.variables.get_history("inflation_rate")
        unemployment_history = self.variables.get_history("unemployment_rate")
        interest_rate_history = self.variables.get_history("interest_rate")
        
        if event:
            event.activate()
            self.apply_event_effects(event)
            event_description = event.description
            event_name = event.name
            active_events.append(event)

        for event in self.events:
            event.update_probability(inflation_history, unemployment_history , interest_rate_history, active_events)

        new_real_rate = compute_real_interest_rate(self.interest_rate, self.indicators.inflation_rate)
        self.real_interest_rates.append(new_real_rate)
        if len(self.real_interest_rates) > 10:
            self.real_interest_rates.pop(0)

        eff_real_rate = effective_real_interest_rate(self.real_interest_rates)
        rate_effect = (eff_real_rate - 0.5) * 0.2
        
        
        if len(inflation_history)>4:
            if inflation_history[-1]+inflation_history[-2]+inflation_history[-3] < 0:
                
                real_balances_effect = (-eff_real_rate + 0.5) * 0.2 + (self.interest_rate +0.5) * 0.2
                
                
            else:
                real_balances_effect = 0
        else:
            real_balances_effect = 0      
        gap_effect = self.compute_gap_effect()

        new_natural_unemployment = (
            self.beta1["natural_unemployment"] * self.indicators.natural_unemployment_rate
            + (1 - self.beta1["natural_unemployment"]) * 4 + shocks[2]
        )
        new_unemployment = (
            new_natural_unemployment
            + self.beta1["unemployment"] * (self.indicators.unemployment_rate - new_natural_unemployment)
            + rate_effect
            + real_balances_effect
            + shocks[1]
        )
        new_inflation = (
            self.beta1["inflation"] * self.indicators.inflation_rate
            + gap_effect
            + shocks[0]
        )
        
        new_inflation = max(new_inflation, new_inflation* 4/5) # This makes inflation prices less mobile downwards
        

        self.indicators.inflation_rate = max(new_inflation, -99)
        self.indicators.unemployment_rate = min(max(1, new_unemployment), 100)
        self.indicators.natural_unemployment_rate = max(2.0, new_natural_unemployment)

        self._initialize_variables()

        current_gap = self.indicators.unemployment_rate - self.indicators.natural_unemployment_rate
        self.historical_gaps.append(current_gap)
        if len(self.historical_gaps) > 6:
            self.historical_gaps.pop(0)

        self.update_historical_data()
        self.current_quarter += 1

        return {
            "event": event_description,
            "event_name": event_name,
            "rate_effect": rate_effect,
            "gap_effect": gap_effect,
            "shocks": shocks.tolist()
        }

    def compute_gap_effect(self):
        weights = [1, 2, 3, 4, 5, 5, 10, 4, 3, 2, 1]
        total_weight = sum(weights)
        normalized_weights = [w / total_weight for w in weights]

        if len(self.historical_gaps) < 11:
            raise ValueError("Not enough historical gaps to compute weighted average")

        weighted_gap = sum(w * g for w, g in zip(normalized_weights, self.historical_gaps[-11:-1]))

        if weighted_gap >= 0:
            return -0.06 * weighted_gap
        else:
            natural_rate = self.indicators.natural_unemployment_rate
            unemployment_rate = self.indicators.unemployment_rate
            return (0.12 * natural_rate / unemployment_rate + 0.12) * (-weighted_gap)

    def update_historical_data(self):
        new_data = pd.DataFrame({
            'Inflation': [self.indicators.inflation_rate],
            'Real_Interest_Rate': [self.real_interest_rates[-1]],
            'Unemployment_Rate': [self.indicators.unemployment_rate]
        })
        self.historical_data = pd.concat([self.historical_data, new_data], ignore_index=True)

    def check_events(self):
        for event in self.events:
            if np.random.rand() < event.probability:
                return event
        return None

    def apply_event_effects(self, event):
        if "inflation" in event.effects:
            self.indicators.inflation_rate += event.effects["inflation"]
        if "unemployment" in event.effects:
            self.indicators.unemployment_rate += event.effects["unemployment"]

    def adjust_interest_rate(self, new_rate):
        try:
            rate = float(new_rate)
            if rate < 0:
                print("Interest rate cannot be negative")
                return False
            if rate > self.interest_rate*9 and rate>self.indicators.inflation_rate+10 :
                print("You are not allowed to raise that much!")
                return False
            self.interest_rate = rate
            return True
        except ValueError:
            print("Invalid interest rate input")
            return False

    def adjust_interest_rate_with_taylor(self) -> float:
        old_rate = self.interest_rate
        t = self.calculate_taylor_rule()

        if abs(t - old_rate) < 0.5:
            new_rate = old_rate

        if t > old_rate + 0.5:
            new_rate = old_rate + 0.25

        if t > old_rate + 1:
            new_rate = old_rate + 0.5

        if t > old_rate + 1 and self.indicators.inflation_rate > 10 and self.indicators.unemployment_rate <= 10:
            new_rate = int(self.indicators.inflation_rate + 8)

        if t < old_rate - 0.5:
            new_rate = old_rate - 0.25

        if t < old_rate - 1:
            new_rate = old_rate - 0.5

        if self.indicators.unemployment_rate > 6 and self.indicators.inflation_rate < 1:
            new_rate = 0

        else:
            new_rate = round(t * 4) / 4

        self.adjust_interest_rate(new_rate)
        return new_rate

    def calculate_taylor_rule(self):
        inflation = self.indicators.inflation_rate
        unemployment = self.indicators.unemployment_rate
        t = 0.5 + inflation + 0.5 * (inflation - 2) + 0.5 * (4.5 - unemployment)
        return t

    def get_state(self):
        return self.variables.values

    def plot_graph(self):
        from visualization import plot_economic_indicators
        plot_economic_indicators(self.variables)
