#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import numpy as np
import pandas as pd
import statsmodels.api as sm
from indicators import EconomicIndicators
from events_new import GameEvent, initialize_events
from variables import Variables
from utils import generate_shocks, compute_real_interest_rate, effective_real_interest_rate

class Economy:
    def __init__(self, initial_state=None):
        self.reputation = 0.8  # Central-bank reputation (0..1)
        self.indicators = initial_state if initial_state else EconomicIndicators.generate_random_initial_state()
        # Draw a central banker persona for the initial simulation
        self.cb_persona = self._draw_cb_persona()   # "good", "dove", or "hawk"
        self.interest_rate = max(float(np.random.normal(0.5, 2)), 0)
        self.current_quarter = 1
        self.max_quarters = 50
        self.variables = Variables()
        self.events = initialize_events()

        self._initialize_variables()

        self.beta1 = {
            "inflation": 1,
            "unemployment": 0.7,
            "natural_unemployment": 1,
            "real_rate_eq": 1    # NEW
        }
        
        self.correlation_matrix = np.array([
            [1.0, 0.0, 0.1, 0.0],
            [0.0, 1.0, 0.2, 0.0],
            [0.1, 0.2, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0]   # r* (uncorrelated initially)
        ])
        self.std_devs = np.array([0.3, 0.1, 0.05, 0.1])  # last one = r* shock size

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

    def _draw_cb_persona(self):
        r = np.random.rand()
        if r < 0.50:
            return "good"       # 50%
        elif r < 0.75:
            return "hawk"       # 25%
        elif r < 0.95:
            return "dove"       # 20%
        else:
            return "careless"   # 5%
        
    def _initialize_variables(self):
        self.variables.update("inflation_rate", self.indicators.inflation_rate)
        self.variables.update("unemployment_rate", self.indicators.unemployment_rate)
        self.variables.update("natural_unemployment_rate", self.indicators.natural_unemployment_rate)
        self.variables.update("interest_rate", self.interest_rate)
        self.variables.update("real_interest_rate", compute_real_interest_rate(self.interest_rate, self.indicators.inflation_rate))
        self.variables.update("unemployment_gap",
                              self.indicators.unemployment_rate - self.indicators.natural_unemployment_rate)
        self.variables.update("cb_reputation", self.reputation)

    def update_reputation(self, prev_inflation, new_inflation, unemployment, real_rate):
        delta = 0.0
        # UP 
        if new_inflation < 2:                       delta += 0.05 
        if new_inflation < prev_inflation:          delta += 0.05
        if (real_rate > 4) and (unemployment > 10): delta += 0.25
        # DOWN
        if new_inflation > 6:                                        delta -= 0.1
        if (prev_inflation > 2) and (new_inflation > prev_inflation): delta -= 0.1
        if (real_rate < 2) and (prev_inflation > 6):                  delta -= 0.1
        # clamp
        self.reputation = float(min(1.0, max(0.0, self.reputation + delta)))

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
        rate_effect = (eff_real_rate - self.indicators.real_rate_eq) * 0.2
        
        
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
            self.beta1["unemployment"] * min( max((self.indicators.unemployment_rate 
                                          + rate_effect
                                          + real_balances_effect
                                          + shocks[1]),0), 100)
            + (1 - self.beta1["unemployment"]) * new_natural_unemployment
        )

#DETERMING NEW INFLATION
        rep = self.reputation                     # 0..1
        
        anchor = 2.0                               # target inflation
        # 1) The economy is more sensitive to shocks when inflation is high
        sens = self.indicators.inflation_rate/4
        # 2) Effects from the past
        #    (at high rep, agents trust anchor more than past inflation)
        adaptive_beta = min( max(0.0, 1.0 - 0.2 * rep), 1)  # 1.0→0.8 as rep 0→1
        adaptive_term = adaptive_beta * self.beta1["inflation"] * self.indicators.inflation_rate        
        drift = (1-adaptive_beta)*anchor 
        
        new_inflation = (
            adaptive_term
            +drift
            + (gap_effect
            + shocks[0])*sens
        )
        
        new_inflation = max(new_inflation, new_inflation* 4/5) # This makes inflation prices less mobile downwards
        

        # 1) Previous actual inflation (from history if available)
        infl_hist = self.variables.get_history("inflation_rate")
        prev_infl = infl_hist[-1] if infl_hist else self.indicators.inflation_rate
        
        # 2) APPLY CAPS → write actuals to indicators
        self.indicators.inflation_rate = max(new_inflation, -99)
        self.indicators.unemployment_rate =  new_unemployment
        self.indicators.natural_unemployment_rate = max(2.0, new_natural_unemployment)
        
        # 3) Compute actual real rate using the *actual* (capped) inflation
        real_rate_actual = compute_real_interest_rate(self.interest_rate, self.indicators.inflation_rate)
        
        # 4) Update reputation using previous actual vs current actuals
        self.update_reputation(
            prev_infl,
            self.indicators.inflation_rate,
            self.indicators.unemployment_rate,
            real_rate_actual
        )
        
        # 5) Now push actuals to Variables/history
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
            return (0.12 * natural_rate / (unemployment_rate+0.001) + 0.12) * (-weighted_gap)

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
        self.interest_rate = float(new_rate)

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
            new_rate = int(self.indicators.inflation_rate * 1.5 + 5)

        if t < old_rate - 0.5:
            new_rate = old_rate - 0.25

        if t < old_rate - 1:
            new_rate = old_rate - 0.5

        if self.indicators.unemployment_rate > 6 and self.indicators.inflation_rate < 1:
            new_rate = 0

        else:
            new_rate = round(t * 4) / 4
            
         
        #Enforcing bounds from gui
        
        new_rate = min(max(new_rate,0), old_rate*9)
        

        self.adjust_interest_rate(new_rate)
        return new_rate

    def calculate_taylor_rule(self):
        inflation = self.indicators.inflation_rate
        unemployment = self.indicators.unemployment_rate
        natural_unemployment = self.indicators.natural_unemployment_rate
    
        if self.cb_persona == "good":
            t = (
                0.9 + inflation
                + 0.5 * (inflation - 2)
                + 0.5 * (natural_unemployment - unemployment)
            )
        elif self.cb_persona == "dove":
            t = (
                inflation
                + 0.1 * (inflation - 4)
                + 0.9 * (natural_unemployment - unemployment)
            )
        elif self.cb_persona == "hawk":
            t = (
                2 + inflation
                + 0.9 * (inflation - 1.5)
                + 0.1 * (natural_unemployment - unemployment)
            )
        else:  # careless
            t = (
                -0.5+ inflation
                + 0.05 * (inflation - 6)                # almost ignores inflation
                + 0.95 * (natural_unemployment - 2 - unemployment)  # huge weight on unemployment gap
            )
        return t

    def get_state(self):
        return self.variables.values

    def plot_graph(self):
        from visualization import plot_economic_indicators
        plot_economic_indicators(self.variables)
