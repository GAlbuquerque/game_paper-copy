#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 19:23:01 2025

@author: gustavo
"""

import numpy as np
from pathlib import Path


def generate_shocks(correlation_matrix, std_devs):
    n = len(std_devs)
    mean = np.zeros(n)
    cov_matrix = np.diag(std_devs) @ correlation_matrix @ np.diag(std_devs)
    shocks = np.random.multivariate_normal(mean, cov_matrix)
    return shocks

def compute_real_interest_rate(interest_rate, inflation_rate):
    return ((1 + interest_rate / 100) / (1 + inflation_rate / 100) - 1) * 100

def effective_real_interest_rate(real_interest_rates):
    weights = np.array([1, 1, 5, 10, 10, 0.1, 0.1, 0.1, 0.1, 0])
    weights /= sum(weights)
    #print("effective_r: ", np.dot(weights, real_interest_rates[-10:]))
    return np.dot(weights, real_interest_rates[-10:])



def charts_dir():
    d = Path.home() / "EconGame" / "charts"
    d.mkdir(parents=True, exist_ok=True)
    return d