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

        self.beta1 = {"inflation": 0.5, "unemployment": 0.9, "natural_unemployment": 1}

        self.correlation_matrix = np.array([
            [1.0, 0.0, 0.1],
            [0.0, 1.0, 0.2],
            [0.1, 0.2, 1.0]
        ])
        self.std_devs = np.array([0.3, 0.2, 0.1])

        self.real_interest_rates = [2.5]
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

        if event:
            event.activate()
            self.apply_event_effects(event)
            event_description = event.description

        for event in self.events:
            event.update_probability(self.indicators)

        new_real_rate = compute_real_interest_rate(self.interest_rate, self.indicators.inflation_rate)
        self.real_interest_rates.append(new_real_rate)
        if len(self.real_interest_rates) > 10:
            self.real_interest_rates.pop(0)

        eff_real_rate = effective_real_interest_rate(self.real_interest_rates)
        rate_effect = (eff_real_rate - 2.5) * 0.2

        gap_effect = self.compute_gap_effect()
        
        inflation_expectation = self.compute_inflation_expectation()
        #print(inflation_expectation)

        new_natural_unemployment = (
            self.beta1["natural_unemployment"] * self.indicators.natural_unemployment_rate
            + (1 - self.beta1["natural_unemployment"]) * 4 + shocks[2]
        )
        new_unemployment = (
            new_natural_unemployment
            + self.beta1["unemployment"] * (self.indicators.unemployment_rate - new_natural_unemployment)
            + rate_effect
            + shocks[1]
        )
        new_inflation = (
            self.beta1["inflation"] * self.indicators.inflation_rate + 0.5*inflation_expectation
            + gap_effect
            + shocks[0]
        )
        print(self.indicators.inflation_rate, new_inflation)


        self.indicators.inflation_rate = max(new_inflation, -99)
        self.indicators.unemployment_rate = min(max(1, new_unemployment), 100)
        self.indicators.natural_unemployment_rate = max(2.0, new_natural_unemployment)

        self._initialize_variables()

        current_gap = self.indicators.unemployment_rate - self.indicators.natural_unemployment_rate
        self.historical_gaps.append(current_gap)

        self.update_historical_data()
        self.current_quarter += 1

        return {
            "event": event_description,
            "rate_effect": rate_effect,
            "gap_effect": gap_effect,
            "shocks": shocks.tolist()
        }

    def compute_gap_effect(self):
        weights = [1, 2, 3, 4, 5, 10, 5, 4, 3, 2, 1]
        total_weight = sum(weights)
        normalized_weights = [w / total_weight for w in weights]

        if len(self.historical_gaps) < 11:
            raise ValueError("Not enough historical gaps to compute weighted average")

        weighted_gap = sum(w * g for w, g in zip(normalized_weights, self.historical_gaps[-11:-1]))

        if weighted_gap >= 0:
            return -0.12 * weighted_gap
        else:
            natural_rate = self.indicators.natural_unemployment_rate
            unemployment_rate = self.indicators.unemployment_rate
            return (0.12 * natural_rate / unemployment_rate + 0.12) * (-weighted_gap)

    def compute_inflation_expectation(self):
        current_period = self.current_quarter
    
        try:
    
            # Shift each column individually
            X = self.historical_data[['Inflation', 'Real_Interest_Rate', 'Unemployment_Rate']].copy()
            X['Inflation'] = X['Inflation'].shift(4)
            X['Real_Interest_Rate'] = X['Real_Interest_Rate'].shift(4)
            X['Unemployment_Rate'] = X['Unemployment_Rate'].shift(4)
    
            X = X.dropna().loc[:current_period]
            y = self.historical_data['Inflation'].loc[X.index]
    
            X = sm.add_constant(X)
    
            model = sm.OLS(y, X).fit()

    
           
            #print(last_row)
            beta_0 = model.params['const']
            beta_1 = max(model.params['Inflation'],0)
            beta_2 = min(model.params['Real_Interest_Rate'],0)
            beta_3 = min(model.params['Unemployment_Rate'],0)
            print(beta_1, beta_2, beta_3)

    
            #print(self.indicators.inflation_rate, self.real_interest_rates, self.indicators.unemployment_rate)
            # Explicit calculation of predicted inflation
            predicted_inflation = (
                beta_0
                + beta_1 * self.indicators.inflation_rate
                + beta_2 * self.real_interest_rates[-1]
                + beta_3 * self.indicators.unemployment_rate
            )
    

            
            #calculating uncertainty
            
            predicted_values = (
    beta_0
    + beta_1 * X['Inflation']
    + beta_2 * X['Real_Interest_Rate']
    + beta_3 * X['Unemployment_Rate']
)

            # Calculate residuals: actual - predicted
            residuals = y - predicted_values
            
            # Drop missing values (if any)
            residuals = residuals.dropna()
            
            # Sum of squared residuals (SSR)
            ssr = (residuals ** 2).sum()
            
            # Average of squared residuals
            average_ssr = ssr / len(residuals)
            
            prediction_error = average_ssr ** (0.5)
    
            print(prediction_error)
            if current_period >= 10:
                prior_sd = (np.sum((self.historical_data['Inflation'].shift(1).loc[current_period-9:current_period] - 2) ** 2)) ** 0.5
            else:
                prior_sd = 2
    
            posterior_mean = (predicted_inflation / prediction_error**2 + 2 / prior_sd**2) / (1 / prediction_error**2 + 1 / prior_sd**2)
            return posterior_mean
    
        except Exception as e:
            # Print the error and return the current inflation rate as expectation
            print(f"Error in computing inflation expectation: {e}")
            return 3

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
            new_rate = min(round(t * 4) / 4, 100000)

        self.adjust_interest_rate(new_rate)
        return new_rate

    def calculate_taylor_rule(self):
        inflation = self.indicators.inflation_rate
        unemployment = self.indicators.unemployment_rate
        t = 2.5 + inflation + 0.5 * (inflation - 2) + 0.5 * (4.5 - unemployment)
        return t

    def get_state(self):
        return self.variables.values

    def plot_graph(self):
        from visualization import plot_economic_indicators
        plot_economic_indicators(self.variables)
