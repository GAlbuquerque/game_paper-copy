#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 10 08:46:44 2025

@author: gustavo
"""

import numpy as np
from dataclasses import dataclass
from typing import List, Dict, Optional, Tuple
import logging
import random
import matplotlib.pyplot as plt

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GameEvent:
    def __init__(self, name: str, description: str, probability: float,
                 effects: Dict[str, float], duration: int = 1):
        self.name = name
        self.description = description
        self.probability = probability  # Probability per quarter
        self.effects = effects  # Dictionary of effects on different variables
        self.duration = duration  # How many quarters the effect lasts
        self.active = False
        self.remaining_duration = 0

    def activate(self):
        self.active = True
        self.remaining_duration = self.duration

    def update(self) -> bool:
        if self.active:
            self.remaining_duration -= 1
            if self.remaining_duration <= 0:
                self.active = False
        return self.active

class Variables:
    """Class to track all economic variables"""
    def __init__(self):
        self.values = {}
        self.history = {}

    def update(self, name: str, value: float):
        self.values[name] = value
        if name not in self.history:
            self.history[name] = []
        self.history[name].append(value)

    def get(self, name: str) -> float:
        return self.values.get(name, 0.0)

    def get_history(self, name: str) -> List[float]:
        return self.history.get(name, [])

@dataclass
class EconomicIndicators:
    inflation_rate: float
    unemployment_rate: float
    natural_unemployment_rate: float
    target_inflation_rate: float

    @classmethod
    def generate_random_initial_state(cls) -> 'EconomicIndicators':
        """Generate random initial economic conditions"""
        natural_unemployment = max(2, np.random.normal(4.5, 5))
        unemployment = max(natural_unemployment + np.random.normal(0, 5), 1)
        inflation = max(np.random.normal(2.0, 0.5), np.random.normal(3.0, 10))

        return cls(
            inflation_rate=inflation,
            unemployment_rate=unemployment,
            natural_unemployment_rate=natural_unemployment,
            target_inflation_rate=2.0
        )

class Economy:
    def __init__(self, initial_state: Optional[EconomicIndicators] = None):
        self.indicators = initial_state if initial_state else EconomicIndicators.generate_random_initial_state()
        self.interest_rate = 4.5
        self.current_quarter = 1
        self.max_quarters = 50
        self.variables = Variables()
        self.events = self._initialize_events()

        # Initialize tracking variables
        self._initialize_variables()

        # Parameters for autoregressive model
        self.beta1 = {"inflation": 1, "unemployment": 0.9, "natural_unemployment": 1}

        # Correlation matrix and standard deviations for shocks
        self.correlation_matrix = np.array([
            [1.0, 0.0, 0.1],
            [0.0, 1.0, 0.2],
            [0.1, 0.2, 1.0]
        ])
        self.std_devs = np.array([0.3, 0.2, 0.1])

        # Initialize real interest rate history
        self.real_interest_rates = [2.5]  # Start with 2.5%
        for _ in range(9):
            self.real_interest_rates.append(
                self.real_interest_rates[-1]
                + np.random.normal(0, 0.25)
            )

        # Initialize historical gap values
        self.historical_gaps = [0] * 6

    def _initialize_events(self) -> List[GameEvent]:
        """Initialize possible economic events"""
        events = [
            GameEvent(
                name="Oil Price Shock",
                description="Global oil prices surge due to geopolitical tensions!",
                probability=0.05,
                effects={
                    "inflation": 4.0,
                    "unemployment": 0.5
                },
                duration=2  # not working
            ),
            # Add more events here
        ]
        return events

    def _initialize_variables(self):
        """Initialize all variables we want to track"""
        self.variables.update("inflation_rate", self.indicators.inflation_rate)
        self.variables.update("unemployment_rate", self.indicators.unemployment_rate)
        self.variables.update("natural_unemployment_rate", self.indicators.natural_unemployment_rate)
        self.variables.update("interest_rate", self.interest_rate)
        self.variables.update("real_interest_rate", self.compute_real_interest_rate())
        self.variables.update("unemployment_gap",
                              self.indicators.unemployment_rate - self.indicators.natural_unemployment_rate)

    def generate_shocks(self) -> np.ndarray:
        """Generate correlated random shocks"""
        mean = np.zeros(3)
        cov_matrix = np.diag(self.std_devs) @ self.correlation_matrix @ np.diag(self.std_devs)
        shocks = np.random.multivariate_normal(mean, cov_matrix)
        print("Shocks: ", shocks)
        return shocks

    def compute_real_interest_rate(self) -> float:
        """Compute the real interest rate"""
        return ((1 + self.interest_rate / 100) / (1 + self.indicators.inflation_rate / 100) - 1) * 100

    def effective_real_interest_rate(self) -> float:
        """Compute effective real interest rate using weighted history"""
        weights = np.array([0.1, 0.1, 0.5, 0.5, 1, 2, 5, 10, 10, 0.1])
        weights /= sum(weights)
        print("effective_r: ", np.dot(weights, self.real_interest_rates[-10:]))
        return np.dot(weights, self.real_interest_rates[-10:])

    def compute_gap_effect(self) -> float:
        """
        Compute the effect of unemployment gap on inflation.

        For unemployment >= natural rate: linear effect with slope -0.4
        For unemployment < natural rate: non-linear effect that grows sharply as u approaches 0
        """
        # Use the gap value from 6 quarters ago
        gap = self.historical_gaps[-6]

        if gap >= 0:
            # Linear response for unemployment above natural rate
            return -0.12 * gap
        else:
            # Non-linear response for unemployment below natural rate
            natural_rate = self.indicators.natural_unemployment_rate
            unemployment_rate = self.indicators.unemployment_rate
            return (0.12 * natural_rate / unemployment_rate + 0.12) * (-gap)

    def check_events(self) -> Optional[GameEvent]:
        """Check if any random events occur this quarter"""
        for event in self.events:
            if not event.active and random.random() < event.probability:
                return event
        return None

    def apply_event_effects(self, event: GameEvent):
        """Apply the effects of an economic event"""
        if "inflation" in event.effects:
            self.indicators.inflation_rate += event.effects["inflation"]
        if "unemployment" in event.effects:
            self.indicators.unemployment_rate += event.effects["unemployment"]

    def adjust_interest_rate(self, new_rate: float) -> bool:
        """Change the federal funds rate with validation"""
        try:
            rate = float(new_rate)
            if rate < 0:
                logger.warning("Interest rate cannot be negative")
                return False
            self.interest_rate = rate
            return True
        except ValueError:
            logger.error("Invalid interest rate input")
            return False

    def simulate_quarter(self) -> Dict[str, any]:
        """Simulate one quarter of economic activity"""
        # Generate shocks and handle events
        shocks = self.generate_shocks()
        event = self.check_events()
        event_description = None

        if event:
            event.activate()
            self.apply_event_effects(event)
            event_description = event.description

        # Update real interest rates
        new_real_rate = self.compute_real_interest_rate()
        self.real_interest_rates.append(new_real_rate)
        if len(self.real_interest_rates) > 10:
            self.real_interest_rates.pop(0)

        # Compute effects
        eff_real_rate = self.effective_real_interest_rate()
        rate_effect = (eff_real_rate - 2.5) * 0.2

        gap_effect = self.compute_gap_effect()

        # Update economic indicators
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
            self.beta1["inflation"] * self.indicators.inflation_rate
            + gap_effect
            + shocks[0]
        )

        # Update indicators
        self.indicators.inflation_rate = new_inflation
        self.indicators.unemployment_rate = max(1, new_unemployment)  # Minimum 1% unemployment
        self.indicators.natural_unemployment_rate = max(2.0, new_natural_unemployment)

        # Update tracking variables
        self._initialize_variables()

        # Store the current gap value
        current_gap = self.indicators.unemployment_rate - self.indicators.natural_unemployment_rate
        self.historical_gaps.append(current_gap)
        if len(self.historical_gaps) > 6:
            self.historical_gaps.pop(0)

        # Increment quarter
        self.current_quarter += 1

        return {
            "event": event_description,
            "rate_effect": rate_effect,
            "gap_effect": gap_effect,
            "shocks": shocks.tolist()
        }

    def calculate_taylor_rule(self) -> float:
        """Calculate the Taylor Rule based on current inflation and unemployment."""
        inflation = self.indicators.inflation_rate
        unemployment = self.indicators.unemployment_rate

        # Taylor Rule Formula: t = 2.5 + 0.5 * (inflation - 2) + 0.5 * (4 - unemployment)
        t = 2.5 + inflation + 0.5 * (inflation - 2) + 0.5 * (4.5 - unemployment)
        return t

    def adjust_interest_rate_with_taylor(self) -> float:
        """Adjust interest rate based on the Taylor Rule and additional conditions."""
        old_rate = self.interest_rate
        t = self.calculate_taylor_rule()

        # Check for the rule when t is close to the current rate
        if abs(t - old_rate) < 0.5:
            new_rate = old_rate  # No change if the difference is small

        # If Taylor Rule suggests rate > current rate by 1%
        elif t > old_rate + 0.5:
            new_rate = old_rate + 0.25  # Increase by 0.25 if difference > 1%

        # If Taylor Rule suggests rate > current rate by 2%
        elif t > old_rate + 1:
            new_rate = old_rate + 0.5  # Increase by 0.5 if difference > 2%

        # If inflation > 10 and unemployment <= 10, override the rule and set to inflation + 5
        if t > old_rate + 1 and self.indicators.inflation_rate > 10 and self.indicators.unemployment_rate <= 10:
            new_rate = int(self.indicators.inflation_rate + 8)

        # If Taylor Rule suggests rate < current rate by 1%
        elif t < old_rate - 0.5:
            new_rate = old_rate - 0.25  # Decrease by 0.25 if difference < -1%

        # If Taylor Rule suggests rate < current rate by 2%
        elif t < old_rate - 1:
            new_rate = old_rate - 0.5  # Decrease by 0.5 if difference < -2%

        # Special case: If unemployment > 6 and inflation < 1, set rate to 0
        if self.indicators.unemployment_rate > 6 and self.indicators.inflation_rate < 1:
            new_rate = 0

        else:
            # Default rule: adjust interest rate to follow Taylor rule suggestions
            new_rate = old_rate + (t - old_rate)

        # Apply the new rate adjustment
        self.adjust_interest_rate(new_rate)
        return new_rate

    def game_over(self) -> bool:
        return self.current_quarter > self.max_quarters

    def get_state(self) -> Dict[str, float]:
        """Get current state of all tracked variables"""
        return self.variables.values

    def plot_graph(self):
        """Plot the graph of inflation, unemployment, and interest rate"""
        inflation_history = self.variables.get_history("inflation_rate")
        unemployment_history = self.variables.get_history("unemployment_rate")
        natural_unemployment_history = self.variables.get_history("natural_unemployment_rate")
        interest_rate_history = self.variables.get_history("interest_rate")

        plt.figure(figsize=(10, 6))
        plt.plot(inflation_history, label="Inflation Rate (%)")
        plt.plot(unemployment_history, label="Unemployment Rate (%)")
        plt.plot(interest_rate_history, label="Interest Rate (%)", linestyle='--')
        #plt.plot(natural_unemployment_history, label="NU", linestyle='--')
        plt.xlabel("Quarter")
        plt.ylabel("Percentage")
        plt.title("Economic Indicators Over Time")
        plt.legend()
        plt.grid(True)
        plt.show()

def main():
    # Create economy with random initial state
    economy = Economy()

    # Main game loop
    for turn in range(1, economy.max_quarters + 1):
        state = economy.get_state()

        # If the game is in the first 10 turns, automatically adjust the interest rate
        if turn <= 40:
            economy.adjust_interest_rate_with_taylor()

        print(f"\nQuarter {economy.current_quarter}")
        print(f"Current inflation: {state['inflation_rate']:.2f}%")
        print(f"Current unemployment: {state['unemployment_rate']:.2f}%")
        #print(f"Natural unemployment: {state['natural_unemployment_rate']:.2f}%")
        print(f"Current interest rate: {state['interest_rate']:.2f}%")
        print(f"Real interest rate: {state['real_interest_rate']:.2f}%")
        #print(f"Unemployment gap: {state['unemployment_gap']:.2f}%")

        # Plot the graph after each quarter
        economy.plot_graph()

        # Skip the user input part for the first 10 turns
        if turn > 40:
            while True:
                try:
                    new_rate = input("Enter new interest rate: ")
                    if not economy.adjust_interest_rate(float(new_rate)):
                        print("Invalid interest rate. Please try again.")
                        continue

                    result = economy.simulate_quarter()
                    if result.get("event"):
                        print(f"\nEVENT: {result['event']}")
                    break
                except ValueError:
                    print("Please enter a valid number for the interest rate")
        else:
            # Simulate the quarter automatically without waiting for user input
            economy.simulate_quarter()

if __name__ == "__main__":
    main()
