#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 19:23:16 2025

@author: gustavo
"""

import matplotlib.pyplot as plt

def plot_economic_indicators(variables):
    inflation_history = variables.get_history("inflation_rate")
    unemployment_history = variables.get_history("unemployment_rate")
    natural_unemployment_history = variables.get_history("natural_unemployment_rate")
    interest_rate_history = variables.get_history("interest_rate")

    plt.figure(figsize=(10, 6))
    plt.plot(inflation_history, label="Inflation Rate (%)")
    plt.plot(unemployment_history, label="Unemployment Rate (%)")
    plt.plot(interest_rate_history, label="Interest Rate (%)", linestyle='--')
    plt.plot(natural_unemployment_history, label="NU", linestyle='--')
    plt.xlabel("Quarter")
    plt.ylabel("Percentage")
    plt.title("Economic Indicators Over Time")
    plt.legend()
    plt.grid(True)
    plt.show()
