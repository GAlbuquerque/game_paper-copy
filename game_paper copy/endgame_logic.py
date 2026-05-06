from dataclasses import dataclass, field
from typing import Optional, Sequence


@dataclass
class EndGameContext:
    mandate: str
    initial_inflation: float
    initial_unemployment: float
    dual_unemployment_target: int
    inflation_history: Sequence[float]
    unemployment_history: Sequence[float]
    real_interest_rate_history: Sequence[float]
    term_event_names: Sequence[str] = field(default_factory=tuple)
    # Backward-compatibility field for older call sites that still pass this name.
    # End-of-term messaging should prefer term_event_names.
    current_event_name: Optional[str] = None


def mandate_targets(mandate: str, dual_unemployment_target: int):
    return {"inflation": 2.0, "unemployment": dual_unemployment_target if mandate == "dual_mandate" else None}


def mandate_text(mandate: str, dual_unemployment_target: int) -> str:
    if mandate == "dual_mandate":
        return (
            f"Dual mandate: keep inflation near 2.0% and unemployment near {dual_unemployment_target}% "
        )
    return "Inflation target mandate: keep inflation near 2.0%."


def classify_public_view(
    infl_hist: Sequence[float],
    unemp_hist: Sequence[float],
    real_rate_hist: Sequence[float],
):
    if not infl_hist:
        return "Balanced", "Economic historians call your record technocratic and disciplined."
    hawk = sum(1 for i, u, r in zip(infl_hist, unemp_hist, real_rate_hist) if i < 2.0 and u > 4.0 and r > 1 )
    dove = sum(1 for i, u, r in zip(infl_hist, unemp_hist, real_rate_hist) if i > 2.0 and u < 7 and r < 0.5 )
    careless = sum(1 for i, u, r in zip(infl_hist, unemp_hist, real_rate_hist) if i > 10.0 and r < 2)
    if hawk  >= 8:
        return "Hawk", "Bond markets saw you as inflation-first and uncompromising."
    if dove  >= 8 and careless < 4:
        return "Dove", "Labor groups remember you as employment-first and patient on prices."
    if careless >= 4:
        return "Careless", "Newspapers decry your failed improvisation and the turbulence it generated. People wonder if you missed your Macroeconomics classes."
    return "Balanced", "Economic historians view you as steady under pressure."



def _join_with_and(items: Sequence[str]) -> str:
    vals = [i for i in items if i]
    if not vals:
        return ""
    if len(vals) == 1:
        return vals[0]
    if len(vals) == 2:
        return f"{vals[0]} and {vals[1]}"
    return f"{', '.join(vals[:-1])}, and {vals[-1]}"

def build_end_of_term_message(ctx: EndGameContext) -> str:
    infl = list(ctx.inflation_history)
    unemp = list(ctx.unemployment_history)
    last12_infl = infl[-12:] if len(infl) >= 12 else infl
    last12_unemp = unemp[-12:] if len(unemp) >= 12 else unemp
    t = mandate_targets(ctx.mandate, ctx.dual_unemployment_target)

    avg_infl = sum(last12_infl) / max(1, len(last12_infl))
    avg_unemp = sum(last12_unemp) / max(1, len(last12_unemp)) if t["unemployment"] is not None else None

    fail_count = sum(1 for x in last12_infl if abs(x - t["inflation"]) > 5.0)
    if t["unemployment"] is not None:
        fail_count += sum(1 for x in last12_unemp if x - t["unemployment"] > 5.0)

    success = abs(avg_infl - t["inflation"]) <= 1
    if t["unemployment"] is not None:
        # Unemployment is asymmetric: readings below target are good, while only
        # readings more than 1 point above target prevent mandate success.
        success = success and avg_unemp - t["unemployment"] <= 1.0
    if fail_count >= 3:
        success = False

    infl_gap0 = abs(ctx.initial_inflation - t["inflation"])
    infl_gap4 = abs((sum(infl[-4:]) / max(1, len(infl[-4:]))) - t["inflation"])
    improved_infl = infl_gap4 < infl_gap0
    half_close_infl = infl_gap4 <= 0.5 * infl_gap0 if infl_gap0 > 0 else True

    improved_unemp = True
    half_close_unemp = False
    mixed = (not success) and improved_infl and half_close_infl 

    if t["unemployment"] is not None:
        un_gap0 = max(0.0, ctx.initial_unemployment - t["unemployment"])
        un_gap4 = max(0.0, (sum(unemp[-4:]) / max(1, len(unemp[-4:]))) - t["unemployment"])
        improved_unemp = un_gap4 == 0 or un_gap4 < un_gap0
        half_close_unemp = un_gap4 == 0 or (un_gap4 <= 0.5 * un_gap0 if un_gap0 > 0 else True)
        mixed = (not success) and improved_infl and improved_unemp and (half_close_infl or half_close_unemp)
        
    label, reput = classify_public_view(infl[-20:], unemp[-20:], list(ctx.real_interest_rate_history)[-20:])
    term_events = getattr(ctx, "term_event_names", ())
    event_ref = _join_with_and(term_events) if term_events else "a volatile policy cycle"

    if success:
        target_msg = "Your mandate targets were met on average."
        lesson = "We will miss you!"
    elif mixed:
        target_msg = "The targets were missed, but the trend improved materially."
        lesson = "In the future, react earlier—small, timely moves are usually cheaper than late shocks."
    else:
        target_msg = "You did not achieve your targets."
        lesson = "In the future, be sure to increase interest rates to fight inflation and decrease them when fighting unemployment."

    return (
        f"Your term has ended. You navigated {event_ref}. {reput} "
        f"They classify you as: {label}\n\n"
        f"{target_msg} {lesson}"
    )
