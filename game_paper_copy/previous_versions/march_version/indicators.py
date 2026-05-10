#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 19:22:18 2025

@author: gustavo
"""

import numpy as np
from dataclasses import dataclass

@dataclass
class EconomicIndicators:
    inflation_rate: float
    unemployment_rate: float
    natural_unemployment_rate: float
    target_inflation_rate: float

    @classmethod
    def generate_random_initial_state(cls):
        natural_unemployment = max(2, np.random.normal(4.5, 5))
        unemployment = max(natural_unemployment + np.random.normal(0, 5), 1)
        inflation = max(np.random.normal(1.5, 0.5), np.random.normal(3.0, 10))
        return cls(
            inflation_rate=inflation,
            unemployment_rate=unemployment,
            natural_unemployment_rate=natural_unemployment,
            target_inflation_rate=2.0
        )
