#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 19:21:46 2025

@author: gustavo
"""



from dataclasses import dataclass, field
from typing import Callable, Dict, List, Optional

# History keys the engine should provide:
# "inflation_rate", "interest_rate", "real_rate_eq", "unemployment_rate",
# "natural_unemployment_rate", and "past_events"
# past_events: list of the last N quarters (oldest→newest), each item either a string (single event)
# or a list of event names triggered that quarter.

History = Dict[str, List]
ProbFn = Callable[[History], float]

@dataclass
class ProbTerm:
    label: str
    fn: ProbFn  # component; total prob = sum(terms)

@dataclass
class GameEvent:
    name: str
    description: str
    prob_terms: List[ProbTerm]                   # a + b + c + ...
    effects_schedule: Dict[str, List[float]]     # explicit 8-slot schedules per indicator
    allowed_difficulties: Optional[List[str]] = None
    is_active: bool = False

    def get_probability(self, history: History) -> float:
        total = 0.0
        for t in self.prob_terms:
            try:
                total += float(t.fn(history))
            except Exception:
                # Term failure shouldn’t crash probability calculation
                total += 0.0
        return max(0.0, min(1.0, total))

    @property
    def effects(self) -> Dict[str, float]:
        # Immediate-only for current engine: use index 0
        return {k: (v[0] if isinstance(v, list) and v else 0.0)
                for k, v in self.effects_schedule.items()}

    def activate(self):
        self.is_active = True

    def update(self):
        # Prepare for lingering effects by shifting one quarter forward
        for k, seq in list(self.effects_schedule.items()):
            if isinstance(seq, list) and seq:
                seq.pop(0)
                seq.append(0.0)
                self.effects_schedule[k] = seq

    # Legacy signature; intentionally no-op.
    def update_probability(self, *args, **kwargs):
        pass


# ---------- Helpers ----------
def last(series: List[float], default: float = 0.0) -> float:
    return series[-1] if series else default

def lag(series: List[float], k: int, default: float = 0.0) -> float:
    """k=1 => last period; k=2 => two periods ago, etc."""
    if not series or k <= 0 or len(series) < k:
        return default
    return series[-k]

def recent_event_count(h: History, name: str, within: int = 8) -> int:
    pe = h.get("past_events", [])
    # Normalize to last `within` entries (oldest→newest)
    window = pe[-within:] if isinstance(pe, list) else []
    count = 0
    for q in window:
        if isinstance(q, list):
            count += sum(1 for e in q if e == name)
        else:
            count += 1 if q == name else 0
    return count


# ---------- Event definitions ----------
def initialize_events() -> List[GameEvent]:
    ev: List[GameEvent] = []

    # --- DEMO EVENT (first) ---
    # Probability = a + b + c
    #   a = 0.2
    #   b = interest_rate two periods ago (percent → decimal) = lag(interest_rate, 3)/100
    #   c = 0.05 * count of "Major Financial Crisis" in last 8 quarters
    # Effects: none (all zeros).
    ev.append(GameEvent(
        name="Demo Probability Event",
        description="Demo: p = 0.2 + IR[-3]/100 + 0.05×(#MajorCrisis in last 8q). No impact.",
        prob_terms=[
            ProbTerm("a_const", lambda h: 0),
            ProbTerm("b_ir_lag2", lambda h: (lag(h.get("interest_rate", []), 3, 0.0) * 0)),
            ProbTerm("c_majorCrisis", lambda h: 0 * recent_event_count(h, "Major Financial Crisis", within=8)),
        ],
        effects_schedule={
            "inflation":             [0, 0, 0, 0, 0, 0, 0, 0],
            "interest_rate":         [0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [0, 0, 0, 0, 0, 0, 0, 0],
            "unemployment":          [0, 0, 0, 0, 0, 0, 0, 0],
            "natural_unemployment":  [0, 0, 0, 0, 0, 0, 0, 0],
        },
    ))

    # --- Financial Crisis ---
    ev.append(GameEvent(
        name="Financial Crisis",
        description="A financial crisis leads to a credit crunch and reduced investment.",
        prob_terms=[
            # a) small baseline
            ProbTerm("a_base", lambda h: 0.01),
    
            # b) hike vs 3 periods ago (percent → decimal), >=0, cap at 0.05
            ProbTerm("b_hike_vs_t-3", lambda h: (
                min(
                    max(
                        (
                            (h.get("interest_rate", [])[-1] if h.get("interest_rate", []) else 0.0) -
                            (h.get("interest_rate", [0.0])[-4] if len(h.get("interest_rate", [])) >= 4
                             else (h.get("interest_rate", [])[-1] if h.get("interest_rate", []) else 0.0))
                        ) / 100,
                        0.0
                    ),
                    0.05
                )
            )),
    
            # c) tail streak of rate < 1% (count), scaled 0.005 per qtr, cap at 0.015
            ProbTerm("c_low_rate_streak", lambda h: (
                min(
                    (lambda s: (lambda idx: (len(s) if idx is None else idx))(
                        next((i for i, x in enumerate(reversed(s)) if x >= 1.0), None)
                    ))(h.get("interest_rate", [])) * 0.005,
                    0.015
                )
            )),
    
            # d) block repeats within last 4 quarters
            ProbTerm("d_recent_block",
                     lambda h, _n="Financial Crisis": (-1e9 if recent_event_count(h, _n, 4) > 0 else 0.0)),
        ],
        effects_schedule={
            "inflation":             [-0.2, -0.2, 0, 0, 0, 0, 0, 0],
            "interest_rate":         [ 0.0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [ -2, -1, 1, 0.5, 0.5, 0.5, 0.5, 0],
            "unemployment":          [ 0.1,  1, 1, 0.5, 0.5, 0, 0, 0],
            "natural_unemployment":  [ 0.2, 0.2, 0.5, 0, 0, -0.2, -0.2, -0.5],
        },
    ))

    ev.append(GameEvent(
        name="Major Financial Crisis",
        description=("Panic spreads through global markets, with commentators evoking the catastrophic collapse of 1929 as systemic crisis looms. "),
        prob_terms=[
            # Base
            ProbTerm("a_base", lambda h: 0.0025),
    
            ProbTerm("b_jump_recent_crisis_highIR", lambda h: (
                0.1 if (
                    recent_event_count(h, "Financial Crisis", within=2) > 0 and
                    h.get("interest_rate", [0])[-1] >= h.get("inflation_rate", [0])[-1]
                ) else 0.0
            )),
            
            ProbTerm("c_jump_recent_crisis_lowIR", lambda h: (
                0.05 if (
                    recent_event_count(h, "Financial Crisis", within=2) > 0 and
                    h.get("interest_rate", [0])[-1] < h.get("inflation_rate", [0])[-1]
                ) else 0.0
            )),
        ],
        effects_schedule={
            "inflation":             [-0.2, -0.5, -0.3, 0, 0, 0, 0, 0],
            "interest_rate":         [ 0.0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [ -5, -2, 1, 1, 1, 1, 1, 2],
            "unemployment":          [ 1, 2, 3, 4, 3, 2.5, 2, 1],
            "natural_unemployment":  [ 0, 1, 1, 0, -0.25, -0.25, -0.5, -1],
        },
    ))

    # --- Trust is HIGH ---
    ev.append(GameEvent(
        name="High Trust",
        description="Public confidence in the Central Bank's commitment to low inflation is strong. "
                    "There is room to maneuver without losing credibility.",
        prob_terms=[
            ProbTerm("trust_high",
                     lambda h: (
                         0.2 if (
                             h["reputation_history"][-1] > 0.8
                            and recent_event_count(h, "High Trust", within=8) == 0
                         ) else 0.0
                     )),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    
    # --- Trust is MEDIUM ---
    ev.append(GameEvent(
        name="Moderate Trust",
        description="Confidence in the Central Bank is moderate and markets are cautions."
                    "Consistent policy could strengthen credibility.",
        prob_terms=[
            ProbTerm("trust_medium",
                     lambda h: (
                         0.9 if (
                             0.4 <= h["reputation_history"][-1] <= 0.7
                             and recent_event_count(h, "Moderate Trust", within=8) == 0
                         ) else 0.0
                     )),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    
    # --- Trust is LOW ---
    ev.append(GameEvent(
        name="Low Trust",
        description="Public confidence in the Central Bank is weak. "
                    "Specialists warn credibility must be rebuilt through clear policy signals.",
        prob_terms=[
            ProbTerm("trust_low",
                     lambda h: (
                         0.2 if (
                             h["reputation_history"][-1] < 0.3
                             and recent_event_count(h, "Low Trust", within=8) == 0
                         ) else 0.0
                     )),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    
    # --- Pressure for Lower Interest Rates ---
    ev.append(GameEvent(
        name="Pressure for Lower Interest Rates",
        description="Public and markets demand the Central Bank to cut rates to stimulate the economy.",
        prob_terms=[
            ProbTerm("pressure_low_rates",
                     lambda h: (
                         0.1 if (
                             h.get("interest_rate", [0])[-1] > 2.0 and
                             h.get("unemployment_rate", [0])[-1] > 7.0 and
                             recent_event_count(h, "Pressure for Lower Interest Rates", 8) == 0
                         ) else 0.0
                     )),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))

    
    # --- High Inflation Warning ---
    ev.append(GameEvent(
        name="High Inflation Warning",
        description="Inflation has crossed 10%. Analysts fear a spiral unless Central Bank restores stability.",
        prob_terms=[
            ProbTerm("high_infl_warn",
                     lambda h: (
                         0.2 if (
                             h.get("inflation_rate", [0])[-1] > 10.0 and
                             h.get("inflation_rate", [0])[-1] > h.get("inflation_rate", [0])[-2]  and
                             h.get("inflation_rate", [0])[-1] < 20.0 and
                             recent_event_count(h, "High Inflation Warning", 8) == 0
                         ) else 0.0
                     )),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    
    # --- Hyperinflation Risk Warning ---
    ev.append(GameEvent(
        name="Hyperinflation Risk",
        description="Inflation has crossed 100%! Analysts fear hyperinflation while massive protests take the streets.",
        prob_terms=[
            ProbTerm("hyperinfl_warn",
                     lambda h: (
                         0.1 if (
                             h.get("inflation_rate", [0])[-1] > 100.0 and
                             h.get("inflation_rate", [0])[-2] > h.get("inflation_rate", [0])[-4] and
                             recent_event_count(h, "Hyperinflation Risk", 8) == 0
                         ) else 0.0
                     )),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    
    # --- Technological Boom ---
    ev.append(GameEvent(
        name="Technological Boom",
        description="A dramatic acceleration in technological progress reshapes the economy, echoing past transformations but with modern global scale.",
        prob_terms=[ProbTerm("a_base", lambda h: 0.01)],
        effects_schedule={
            "inflation":             [0.1, 0.2, 0, -0.5, -1, -1, -0.5, 0],
            "interest_rate":         [ 0.0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [ 0.1, 0.2, 0, 0, -0.2, -0.1, 0, 0],
            "unemployment":          [-0.3, -0.2, 0.5, 0.5, 0.5, 0.5, 0.1, 0.1],
            "natural_unemployment":  [ -0.3, -0.3, 0.5, 0.5, 1, -0.1, -0.1, -0.1],
        },
    ))

    # --- Pandemic Outbreak ---
    ev.append(GameEvent(
        name="Pandemic Outbreak",
        description="A public health crisis disrupts supply chains and labor markets",
        prob_terms=[ProbTerm("a_base", lambda h: 0.005)],
        effects_schedule={
            "inflation":             [ 1, 2, 2, 0.5, 0.5, 0.5, 0.2, 0],
            "interest_rate":         [ 0.0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [ 0.0, 0, 0, 0, 0, 0, 0, 0],
            "unemployment":          [ 7, 6, -7, -2, -1, 0, 0, 0],
            "natural_unemployment":  [ 2, 1, -1, -1, -1, -1,0, 0],
        },
    ))

    # --- Natural Disaster ---
    ev.append(GameEvent(
        name="Natural Disaster",
        description="Severe natural events damage infrastructure and disrupt production.",
        prob_terms=[
            ProbTerm("a_base", lambda h: 0.01),
            ProbTerm("b_recent_block",
                     lambda h: (-1e9 if recent_event_count(h, "Natural Disaster", 8) > 0 else 0.0)),
        ],
        effects_schedule={
            "inflation":             [1, 2, 0, 0, 0, 0, 0, 0],
            "interest_rate":         [0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [0, 0, 0, 0, 0, 0, 0, 0],
            "unemployment":          [0.3, 0.1, 0, 0, 0, 0, 0, 0],
            "natural_unemployment":  [0.2, 0.1, 0, 0, 0, 0, 0, -0.3],
        },
    ))
    
    # --- Global Supply Shock ---
    ev.append(GameEvent(
        name="Global Supply Shock",
        description=("Geopolitical conflict disrupts energy supply, pushing up costs across the economy."),
        prob_terms=[ProbTerm("a_base_rare", lambda h: 0.008)],
        effects_schedule={
            "inflation":             [1.5, 2.5, 1.5, 0.5, 0, 0, 0, 0],
            "interest_rate":         [0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [0.2, 0.2, 0.1, -0.1,-0.2 , -0.2, 0, 0],
            "unemployment":          [0.3, 0.5, 0.3, 0.1, 0, 0, 0, 0],
            "natural_unemployment":  [1, 3, 3, 0, -1, -1, -1, -1],
        },
    ))
    
    # --- Fiscal Deficit ---
    ev.append(GameEvent(
        name="Fiscal Deficit",
        description="Deficits support short-term demand, but raise fears of unsustainable debt and inflation.",
        prob_terms=[
            ProbTerm("a_base", lambda h: 0.02),
            ProbTerm("b_low_infl_high_unemp", lambda h: (
                0.1 if (h.get("inflation_rate", [0])[-1] < 1.0 and
                         h.get("unemployment_rate", [0])[-1] > 10.0) else 0.0
            )),
            ProbTerm("c_recent_block",
                     lambda h: (-0.2 if recent_event_count(h, "Fiscal Deficit", 8) > 0 else 0.0)),
        ],
        effects_schedule={
            "inflation":             [0.2, 0.1, 0.1, 0, 0, 0, 0, 0],
            "interest_rate":         [0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.2, -0.3],
            "unemployment":          [-0.5, -0.8, -0.5, 0, 0, 0, 0, 0],
            "natural_unemployment":  [0, 0, 0, 0, 0, 0, 0, 0],
        },
    ))
    
    # --- Fiscal Crisis (Extreme Deficit) ---
    ev.append(GameEvent(
        name="Spending Wave",
        description="Massive public spending is hailed as a path to jobs and prosperity, though critics warn of hyperinflation.",
        prob_terms=[
            ProbTerm("a_base", lambda h: 0.005),
            ProbTerm("b_low_infl_high_unemp", lambda h: (
                0.1 if (h.get("inflation_rate", [0])[-1] < 0 and
                         h.get("unemployment_rate", [0])[-1] > 12.0) else 0.0
            )),
            ProbTerm("c_recent_block",
                     lambda h: (-0.1 if recent_event_count(h, "Spending Wave", 8) > 0 else 0.0)),
        ],
        effects_schedule={
            "inflation":             [0.7, 1, 1, 0.5, 0.3, 0, 0, 0],
            "interest_rate":         [0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [4, 0, 0, 0, -1, -1, -1, -1],
            "unemployment":          [-2, -2, -2, -1, -1, 0, 0, 0],
            "natural_unemployment":  [0, 0, 0, 0, 0, 0, 0, 0],
        },
    ))
    
    # --- Fiscal Surplus ---
    ev.append(GameEvent(
        name="Fiscal Surplus",
        description="Balanced books inspire confidence in sustainability, even as critics caution against tightening too far.",
        prob_terms=[
            ProbTerm("a_base", lambda h: 0.01),
            ProbTerm("b_recent_block",
                     lambda h: (-0.05 if recent_event_count(h, "Fiscal Surplus", 8) > 0 else 0.0)),
        ],
        effects_schedule={
            "inflation":             [0, 0, 0, 0, 0, 0, 0, 0],
            "interest_rate":         [0, 0, 0, 0, 0, 0, 0, 0],
            "real_rate_eq":          [-1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.3],
            "unemployment":          [0.5, 0.2, 0, 0, 0, 0, 0, 0],
            "natural_unemployment":  [0.5, 0, 0, 0, 0, 0, 0, 0],
        },
    ))
    # --- Research Note: Policy Lags (Q ~42) ---
    ev.append(GameEvent(
        name="Research on Policy Lags",
        description=("New research suggests real interest rate changes take about 1 year to impact employment "
                     "and about 2 years to impact inflation."),
        allowed_difficulties=["senior", "central_banker"],
        prob_terms=[
            ProbTerm("trigger_42_44",
    lambda h: (1 if 41 <= h.get("quarter_user", 1) <= 44 else 0.0)),
            ProbTerm("c_recent_block",
                     lambda h: (-1 if recent_event_count(h, "Research on Policy Lags", 8) > 0 else 0.0)),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))

    # --- Lesson Event Stubs (disabled for now) ---
    ev.append(GameEvent(
        name="Explainer: Unemployment and Inflation",
        description=("Lesson: Unemployment measures the share of people actively looking for work who cannot find jobs. "
                     "When unemployment is very low, wages and demand can rise faster, adding inflation pressure. "
                     "When it is high, inflation usually cools because spending power weakens."),
        prob_terms=[ProbTerm("disabled_for_now", lambda h: -1.0)],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    ev.append(GameEvent(
        name="Explainer: Real Interest Rates and Employment",
        description=("Lesson: The real interest rate is approximately the policy rate minus inflation. "
                     "Higher real rates make borrowing costlier and tend to reduce aggregate demand, which can raise unemployment. "
                     "Lower real rates usually support demand and employment, with effects that arrive gradually."),
        prob_terms=[ProbTerm("disabled_for_now", lambda h: -1.0)],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    ev.append(GameEvent(
        name="Explainer: Trust and Expectations Anchoring",
        description=("Lesson: If people trust the central bank, inflation expectations stay anchored near target. "
                     "Anchored expectations reduce self-fulfilling inflation spirals and make policy less costly for jobs."),
        prob_terms=[ProbTerm("disabled_for_now", lambda h: -1.0)],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    ev.append(GameEvent(
        name="Explainer: Natural Unemployment Rate",
        description=("Lesson: The natural unemployment rate is the level consistent with stable inflation in the medium run, "
                     "reflecting frictions like job search and skill mismatch. "
                     "Policy can move unemployment around it temporarily, but structural reforms influence it more durably."),
        prob_terms=[ProbTerm("disabled_for_now", lambda h: -1.0)],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    ev.append(GameEvent(
        name="Explainer: Nominal vs Real Variables",
        description=("Lesson: Nominal variables are measured in current prices, while real variables adjust for inflation. "
                     "Policy decisions based only on nominal rates can be misleading when inflation shifts quickly."),
        prob_terms=[ProbTerm("disabled_for_now", lambda h: -1.0)],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))
    
    # --- Hawk op-ed: Time for a Hike? ---
    ev.append(GameEvent(
        name="Hawk Economist Calls for Rate Hike",
        description=("'It is time for a decisive hike: only by holding rates well above inflation can we "
                     "discipline the labour market, restore the bank’s authority, and crush inflation.', she says"),
        prob_terms=[
            # 1) 0 if we had this in the last 8 terms
            ProbTerm("cooldown_8", lambda h: (-1.0 if recent_event_count(h, "Hawk Economist Calls for Rate Hike", within=8) > 0 else 0.0)),
    
            # 2) increasing in inflation, starting from 3% (cap at 0.6 here)
            #    e.g., 4% -> 0.1 ; 8% -> 0.5 ; 9%+ -> 0.6
            ProbTerm("inflation_ramp", lambda h: (
                max(0.0, min(0.6, 0.1 * ((h.get("inflation_rate", [])[-1]) - 3.0)))
                if h.get("inflation_rate", []) else 0.0
            )),
    
            # 3) 0 when interest_rate > inflation + 3  (force to zero)
            ProbTerm("already_tight", lambda h: (
                -1.0 if (
                    h.get("interest_rate", []) and h.get("inflation_rate", [])
                    and (h["interest_rate"][-1] > h["inflation_rate"][-1] + 3.0)
                ) else 0.0
            )),
        ],
        effects_schedule={k:[0,0,0,0,0,0,0,0] for k in
            ["inflation","interest_rate","real_rate_eq","unemployment","natural_unemployment"]},
    ))


    
    return ev
