#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 19:21:46 2025

@author: gustavo
"""

# events.py

class GameEvent:
    def __init__(self, name, description, probability, effects, duration=1):
        self.name = name
        self.description = description
        self.base_probability = probability  # Store the base probability
        self.probability = probability  # This is what economy.py will read
        self.effects = effects
        self.duration = duration
        self.active = False
        self.remaining_duration = 0

    def activate(self):
        self.active = True
        self.remaining_duration = self.duration

    def update(self):
        if self.active:
            self.remaining_duration -= 1
            if self.remaining_duration <= 0:
                self.active = False
        return self.active

    def update_probability(self, inflation_history, unemployment_history , interest_rate_history, active_events):
        """Update probability based on economic conditions and previous events"""
        # Reset to base probability first
        self.probability = self.base_probability/2
        #self.probability = self.base_probability


        # Modify the Increased Deficit event
        if self.name == "Increased Deficit" or self.name == "Increased Deficit(huge)":
            try: 
                if unemployment_history[-1] > 10 and inflation_history[-1] < 1:
                    self.probability = 0.3
            except:
                print("first period?")
            if (self.name == "Increased Deficit" in active_events) or (self.name == "Increased Deficit(huge)" in active_events):
               self.probability = self.probability + 0.5 
                
        # Modify the Financial Crisis event and housing crisis event
        if self.name == "Financial Crisis" or self.name == "Housing Market Crash":
            try: 
                if interest_rate_history[-1] - inflation_history[-1]> interest_rate_history[-4]- inflation_history[-4]+2:
                    self.probability = 0.05
            except:
                 #print("first period?")
                 None

        # Modify the Major Financial Crisis event
        if self.name == "Major Financial Crisis":
            try:
                if interest_rate_history[-1] - inflation_history[-1]> interest_rate_history[-4]- inflation_history[-4]+2:
                    self.probability += 0.01
            except:
               #   print("first period?")
               None
            if "Financial Crisis" in active_events:
                    self.probability += 0.3  # Increase probability if there was a recent Financial Crisis
           

        # Modify Trust in Central Bank events
        if self.name == "Loss of Trust in Central Bank":
            quarters_met = sum(1 for i in range(-8, 0)
                               if len(inflation_history) + i > 0 and
                               inflation_history[i] > 5 and
                               inflation_history[i] > inflation_history[i-1] and
                               interest_rate_history[i] <= interest_rate_history[i-1])
            self.probability = min(0.015 * quarters_met, 1.0)  # Increase probability incrementally

        if self.name == "Regain Trust in Central Bank":
            quarters_met = sum(1 for i in range(-8, 0)
                               if len(inflation_history) + i > 0 and
                               inflation_history[i] > 5 and
                               inflation_history[i] < inflation_history[i-1] and
                               interest_rate_history[i] > inflation_history[i] + 4
                               )
            self.probability = min(0.015 * quarters_met, 1.0)  # Increase probability incrementally

def initialize_events():
    events = [
        GameEvent(
            name="Increased Deficit",
            description="Worried about unemployment, the government has started a fiscal stimulus",
            probability=0.008,
            effects={
                "inflation": 0.3,
                "unemployment": -0.5
            },
            duration=3
        ),
        GameEvent(
            name="Increased Deficit(huge)",
            description="Worried about unemployment, the government has started a huge fiscal stimulus",
            probability=0.0032,
            effects={
                "inflation": 2,
                "unemployment": -2
            },
            duration=3
        ),
        GameEvent(
            name="Oil Price Shock",
            description="Global oil prices surge due to geopolitical tensions!",
            probability=0.016,
            effects={
                "inflation": 3,
                "unemployment": 0.5
            },
            duration=2
        ),
        GameEvent(
            name="Technological Boom",
            description="A wave of innovation sweeps through the economy, boosting productivity!",
            probability=0.008,
            effects={
                "inflation": -1.0,
                "unemployment": -0.5
            },
            duration=3
        ),
        GameEvent(
            name="Pandemic Outbreak",
            description="A global pandemic disrupts supply chains and reduces consumption.",
            probability=0.0032,
            effects={
                "inflation": 1.5,
                "unemployment": 3.0
            },
            duration=4
        ),
        GameEvent(
            name="Green Energy Investment",
            description="Massive investment in renewable energy sources boosts the economy.",
            probability=0.008,
            effects={
                "inflation": -0.1,
                "unemployment": -1.0
            },
            duration=3
        ),
        GameEvent(
            name="Trade War",
            description="A trade war with major trading partners reduces net exports.",
            probability=0.008,
            effects={
                "inflation": 1.5,
                "unemployment": 1.5
            },
            duration=3
        ),
        GameEvent(
            name="Natural Disaster",
            description="A natural disaster disrupts local production and supply chains.",
            probability=0.008,
            effects={
                "inflation": 0.5,
                "unemployment": 0.2
            },
            duration=2
        ),
        GameEvent(
            name="Housing Market Crash",
            description="A crash in the housing market reduces investment and consumption.",
            probability=0.004,
            effects={
                "inflation": -1.5,
                "unemployment": 3.0
            },
            duration=4
        ),
        GameEvent(
            name="Global Recession",
            description="A global recession reduces demand for exports and investment.",
            probability=0.004,
            effects={
                "inflation": -0.5,
                "unemployment": 2.0
            },
            duration=5
        ),
        GameEvent(
            name="Cybersecurity Threat",
            description="A major cybersecurity threat disrupts digital infrastructure.",
            probability=0.008,
            effects={
                "inflation": 0.1,
                "unemployment": 0.1
            },
            duration=2
        ),
        GameEvent(
            name="Tourism Boom",
            description="A surge in tourism boosts consumption and investment.",
            probability=0.008,
            effects={
                "inflation": 0.1,
                "unemployment": -0.1
            },
            duration=2
        ),
        GameEvent(
            name="Financial Crisis",
            description="A financial crisis leads to a credit crunch and reduced investment.",
            probability=0.032,
            effects={
                "inflation": -0.2,
                "unemployment": 1.0
            },
            duration=4
        ),
        GameEvent(
            name="Major Financial Crisis",
            description="A major financial crisis leads to a credit crunch and reduced investment.",
            probability=0.0008,
            effects={
                "inflation": -1.0,
                "unemployment": 4.0
            },
            duration=4
        ),
        GameEvent(
            name="Infrastructure Investment",
            description="Government invests heavily in infrastructure, boosting employment.",
            probability=0.024,
            effects={
                "inflation": 0.1,
                "unemployment": -0.5
            },
            duration=3
        ),
        GameEvent(
            name="Supply Chain Disruption",
            description="Foreign conflicts cause a major supply chain disruption and affects production and inflation.",
            probability=0.016,
            effects={
                "inflation": 1.5,
                "unemployment": 0.5
            },
            duration=3
        ),
        GameEvent(
            name="Loss of Trust in Central Bank",
            description="Extended periods of high inflation without interest rate hikes lead to a loss of trust in the central bank.",
            probability=0,
            effects={
                "inflation": 2.0,
                "unemployment": 0
            },
            duration=3
        ),
        GameEvent(
            name="Regain Trust in Central Bank",
            description="The central bank regains trust by keeping high interest rates during high inflation.",
            probability=0,
            effects={
                "inflation": -2.0,
                "unemployment": 1.0
            },
            duration=3
        )
    ]
    return events