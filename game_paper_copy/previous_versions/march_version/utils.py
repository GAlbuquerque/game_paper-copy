#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 19:23:01 2025

@author: gustavo
"""

import numpy as np

def generate_shocks(correlation_matrix, std_devs):
    mean = np.zeros(3)
    cov_matrix = np.diag(std_devs) @ correlation_matrix @ np.diag(std_devs)
    shocks = np.random.multivariate_normal(mean, cov_matrix)
    #print("Shocks: ", shocks)
    return shocks

def compute_real_interest_rate(interest_rate, inflation_rate):
    return ((1 + interest_rate / 100) / (1 + inflation_rate / 100) - 1) * 100

def effective_real_interest_rate(real_interest_rates):
    weights = np.array([0.1, 0.1, 0.5, 0.5, 1, 2, 5, 10, 10, 0.1])
    weights /= sum(weights)
    #print("effective_r: ", np.dot(weights, real_interest_rates[-10:]))
    return np.dot(weights, real_interest_rates[-10:])
