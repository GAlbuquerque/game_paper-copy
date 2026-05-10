#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb  9 22:01:31 2025

@author: gustavo
"""

import numpy as np
import matplotlib.pyplot as plt
from dataclasses import dataclass
from typing import List, Dict, Optional
import logging
import random

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Variables:
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

dataclass
class EconomicIndicators:
    inflation_rate: float
    unemployment_rate: float
    natural_unemployment_rate: float
    target_inflation_rate: float = 2.0

    @classmethod
    def generate_random_initial_state(cls):
        return cls(inflation_rate=2.0, unemployment_rate=4.0, natural_unemployment_rate=4.0)

class Economy:
    def __init__(self):
        self.indicators = EconomicIndicators.generate_random_initial_state()
        self.interest_rate = 4.5
        self.current_quarter = 1
        self.max_quarters = 16
        self.variables = Variables()
        self._initialize_variables()
    
    def _initialize_variables(self):
        self.variables.update("inflation_rate", self.indicators.inflation_rate)
        self.variables.update("unemployment_rate", self.indicators.unemployment_rate)
        self.variables.update("interest_rate", self.interest_rate)

    def adjust_interest_rate(self):
        if self.current_quarter <= 10:
            if self.indicators.inflation_rate > 10:
                if self.indicators.unemployment_rate <= 10:
                    self.interest_rate = self.indicators.inflation_rate + 5
            elif self.indicators.inflation_rate > self.indicators.target_inflation_rate:
                self.interest_rate += 0.25
            elif self.indicators.inflation_rate < self.indicators.target_inflation_rate:
                self.interest_rate -= 0.25
    
    def simulate_quarter(self):
        self.adjust_interest_rate()
        self.indicators.inflation_rate += random.uniform(-0.5, 0.5)
        self.indicators.unemployment_rate += random.uniform(-0.2, 0.2)
        self._initialize_variables()
        self.current_quarter += 1
    
    def game_over(self):
        return self.current_quarter > self.max_quarters

    def plot_graphs(self):
        quarters = list(range(1, self.current_quarter + 1))
        plt.figure(figsize=(10, 5))
        plt.plot(quarters, self.variables.get_history("inflation_rate"), label="Inflation")
        plt.plot(quarters, self.variables.get_history("unemployment_rate"), label="Unemployment")
        plt.plot(quarters, self.variables.get_history("interest_rate"), label="Interest Rate")
        plt.xlabel("Quarter")
        plt.ylabel("%")
        plt.legend()
        plt.title("Economic Indicators Over Time")
        plt.show()

def main():
    economy = Economy()
    while not economy.game_over():
        print(f"\nQuarter {economy.current_quarter}")
        economy.simulate_quarter()
        economy.plot_graphs()

if __name__ == "__main__":
    main()
