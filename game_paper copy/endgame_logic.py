from dataclasses import dataclass
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
    current_event_name: Optional[str]


def mandate_targets(mandate: str, dual_unemployment_target: int):
    return {"inflation": 2.0, "unemployment": dual_unemployment_target if mandate == "dual_mandate" else None}


def mandate_text(mandate: str, dual_unemployment_target: int) -> str:
    if mandate == "dual_mandate":
        return (
            f"Dual mandate: keep inflation near 2.0% and unemployment near {dual_unemployment_target}% "
            "(derived from the pre-term labor baseline)."
        )
    return "Inflation target mandate: keep inflation near 2.0%."


def classify_public_view(
    infl_hist: Sequence[float],
    unemp_hist: Sequence[float],
    real_rate_hist: Sequence[float],
):
    if not infl_hist:
        return "Balanced", "Economic historians call your record technocratic and disciplined."
    hawk = sum(1 for i, u in zip(infl_hist, unemp_hist) if i > 3.0 and u < 5.0)
    dove = sum(1 for i, u in zip(infl_hist, unemp_hist) if u > 6.0 and i < 3.0)
    careless = sum(1 for i, u in zip(infl_hist, unemp_hist) if i > 8.0 or u > 9.0)
    very_tight = sum(1 for r in real_rate_hist if r > 4.0)
    very_loose = sum(1 for r in real_rate_hist if r < -1.0)
    if careless >= 6:
        return "Careless", "Market historians describe your approach as improvisation by turbulence."
    if hawk + very_tight >= 15:
        return "Hawk", "Bond markets saw you as inflation-first and uncompromising."
    if dove + very_loose >= 15:
        return "Dove", "Labor groups remember you as employment-first and patient on prices."
    return "Steady Hand", "Economic historians view you as balanced under pressure."


def build_end_of_term_message(ctx: EndGameContext) -> str:
    infl = list(ctx.inflation_history)
    unemp = list(ctx.unemployment_history)
    last12_infl = infl[-12:] if len(infl) >= 12 else infl
    last12_unemp = unemp[-12:] if len(unemp) >= 12 else unemp
    t = mandate_targets(ctx.mandate, ctx.dual_unemployment_target)

    avg_infl = sum(last12_infl) / max(1, len(last12_infl))
    avg_unemp = sum(last12_unemp) / max(1, len(last12_unemp)) if t["unemployment"] is not None else None

    fail_count = sum(1 for x in last12_infl if abs(x - t["inflation"]) > 1.0)
    if t["unemployment"] is not None:
        fail_count += sum(1 for x in last12_unemp if abs(x - t["unemployment"]) > 1.5)

    success = abs(avg_infl - t["inflation"]) <= 0.6
    if t["unemployment"] is not None:
        success = success and abs(avg_unemp - t["unemployment"]) <= 1.0
    if fail_count >= 3:
        success = False

    infl_gap0 = abs(ctx.initial_inflation - t["inflation"])
    infl_gap4 = abs((sum(infl[-4:]) / max(1, len(infl[-4:]))) - t["inflation"])
    improved_infl = infl_gap4 < infl_gap0
    half_close_infl = infl_gap4 <= 0.5 * infl_gap0 if infl_gap0 > 0 else True

    improved_unemp = True
    half_close_unemp = False
    if t["unemployment"] is not None:
        un_gap0 = abs(ctx.initial_unemployment - t["unemployment"])
        un_gap4 = abs((sum(unemp[-4:]) / max(1, len(unemp[-4:]))) - t["unemployment"])
        improved_unemp = un_gap4 < un_gap0
        half_close_unemp = un_gap4 <= 0.5 * un_gap0 if un_gap0 > 0 else True

    mixed = (not success) and improved_infl and improved_unemp and (half_close_infl or half_close_unemp)
    label, reput = classify_public_view(infl[-20:], unemp[-20:], list(ctx.real_interest_rate_history)[-20:])
    event_ref = ctx.current_event_name or "a volatile policy cycle"

    if success:
        target_msg = "Full success: your mandate targets were met on average."
        lesson = "In the future, keep policy rates firmly above inflation when demand overheats."
    elif mixed:
        target_msg = "Mixed result: the targets were missed, but the trend improved materially."
        lesson = "In the future, react earlier—small, timely moves are usually cheaper than late shocks."
    else:
        target_msg = "Failure: the mandate was not achieved with enough consistency."
        lesson = "In the future, align rates with both inflation pressure and labor slack, not headlines."

    humor = " (Your memes may outperform your macro model.)" if label == "Careless" else ""
    return (
        f"Your term has ended. You navigated {event_ref}. Based on your behavior, {reput} "
        f"They classify you as: {label}.{humor}\n\n"
        f"{target_msg} {lesson}"
    )
