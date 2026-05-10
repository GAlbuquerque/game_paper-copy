#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 19:22:36 2025

@author: gustavo
"""

class Variables:
    """Class to track all economic variables"""
    def __init__(self):
        self.values = {}
        self.history = {}

    def update(self, name, value):
        self.values[name] = value
        if name not in self.history:
            self.history[name] = []
        self.history[name].append(value)

    def get(self, name):
        return self.values.get(name, 0.0)

    def get_history(self, name):
        return self.history.get(name, [])
