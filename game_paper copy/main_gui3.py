#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 13:17:54 2025

@author: gustavo
"""

from datetime import datetime
from pathlib import Path
from collections import defaultdict
import ctypes
import tkinter as tk
from tkinter import messagebox, ttk

import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

from economy import Economy


offset = 10  # hidden turns
PLAYER_START_TURN = 40
APP_TITLE = "Policy Interest Rate Simulator"
SCENARIOS = {
    "Random": None,
    "Stable Economy": None,
    "Stagflation": None,
    "High Inflation": None,
    "Depression": None,
}


class EconomicGameApp:
    def __init__(self, root, difficulty="central_banker", scenario_name="Random"):
        self.root = root
        self.root.title(APP_TITLE)
        self.difficulty = difficulty
        self.scenario_name = scenario_name

        self.style = ttk.Style()
        self.style.theme_use("default")

        self._configure_colors()
        self.configure_styles()
        self._initialize_game_state()
        self._build_layout()
        self._bind_events()

        self.bootstrap_initial_history()
        self._configure_root_grid()
        self.root.after(100, self.print_window_size)
        self.root.after(120, self.freeze_initial_window_geometry)
        self.configure_styles()

    def _configure_colors(self):
        self.bg_color = "#FFFFFF"
        self.text_color = "#000000"
        self.button_bg_color = "#FFFFFF"
        self.button_fg_color = "#000000"
        self.inflation_color = "red"
        self.unemployment_color = "blue"
        self.interest_rate_color = "green"
        self.term_line_color = "black"

    def _initialize_game_state(self):
        self.economy = Economy(
            difficulty="central_banker",
            scenario=self._sample_scenario(self.scenario_name),
        )
        self.economy.player_start_turn = PLAYER_START_TURN
        # Likely intent issue preserved for equivalence:
        # bootstrap_initial_history() replaces self.economy, but these baselines are
        # not refreshed there or in new_game(). End-of-term text therefore compares
        # against the first Economy built here, not the live run that follows.
        # Intended alternative:
        # self.initial_inflation = self.economy.indicators.inflation_rate
        # self.initial_unemployment = self.economy.indicators.unemployment_rate
        self.initial_inflation = self.economy.indicators.inflation_rate
        self.initial_unemployment = self.economy.indicators.unemployment_rate
        self.current_term_start = PLAYER_START_TURN + 1
        self.term_length = 16
        self.current_event_name = None
        self.end_game_window = None
        self.graph_window_mode = "full"
        self.graph_split_mode = False

    def _build_layout(self):
        self._build_main_frame()
        self._build_header()
        self._build_stats_section()
        self._build_graph_section()
        self._build_news_section()
        self._build_controls()

    def _build_main_frame(self):
        self.main_frame = ttk.Frame(self.root, padding="10", style="Main.TFrame")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

    def _build_header(self):
        self.title_label = ttk.Label(
            self.main_frame,
            text=APP_TITLE,
            font=("Helvetica", 30),
            style="Main.TLabel",
        )
        self.title_label.grid(row=0, column=0, columnspan=3, pady=5)

        self.quarter_label = ttk.Label(
            self.main_frame,
            text=f"Quarter: {max(1, self.economy.current_quarter - offset)}",
            font=("Helvetica", 16),
            style="Main.TLabel",
        )
        self.quarter_label.grid(row=1, column=0, columnspan=3, pady=5)

    def _build_stats_section(self):
        self.stats_frame = ttk.LabelFrame(
            self.main_frame,
            text="Economic Indicators",
            padding="10",
            style="Main.TLabelframe",
        )
        self.stats_frame.grid(row=2, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))
        self.create_stats_panel()

    def _build_graph_section(self):
        self.graph_frame = ttk.LabelFrame(
            self.main_frame,
            text="Economic Graphs",
            padding="5",
            style="Main.TLabelframe",
        )
        self.graph_frame.grid(row=4, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))
        self._build_graph_controls()
        self.create_graph_panel()

    def _build_graph_controls(self):
        controls = ttk.Frame(self.graph_frame, style="Main.TFrame")
        controls.pack(fill=tk.X, padx=2, pady=(0, 6))

        self.view_toggle_button = ttk.Button(
            controls,
            text="History: Full",
            command=self.toggle_graph_window_mode,
            style="Main.TButton",
        )
        self.view_toggle_button.pack(side=tk.LEFT, padx=(0, 6))

        self.split_toggle_button = ttk.Button(
            controls,
            text="Layout: Combined",
            command=self.toggle_graph_split_mode,
            style="Main.TButton",
        )
        self.split_toggle_button.pack(side=tk.LEFT)

    def _build_news_section(self):
        self.news_frame = ttk.LabelFrame(
            self.main_frame,
            text="News Feed",
            padding="10",
            style="Main.TLabelframe",
        )
        self.news_frame.grid(row=5, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

        self.news_text = tk.Text(
            self.news_frame,
            font=("Helvetica", 14),
            height=5,
            wrap="word",
            background="white",
        )
        scrollbar = tk.Scrollbar(self.news_frame, orient="vertical", command=self.news_text.yview)
        self.news_text.configure(yscrollcommand=scrollbar.set)
        self.news_text.tag_config("detail", foreground="firebrick", font=("Helvetica", 12, "italic"))

        self.latest_event_label = tk.Label(
            self.news_frame,
            text="",
            font=("Helvetica", 16, "bold"),
            fg="red",
            bg=self.news_text.cget("background"),
            justify="left",
            wraplength=600,
            height=3,
            anchor="w",
            padx=10,
            pady=5,
        )
        self.latest_event_label.grid(
            row=1,
            column=0,
            columnspan=2,
            sticky=(tk.W, tk.E),
            pady=(5, 0),
        )

        self.news_text.grid(row=0, column=0, sticky=(tk.N, tk.S, tk.W, tk.E))
        scrollbar.grid(row=0, column=1, sticky=(tk.N, tk.S))

        self.news_frame.rowconfigure(0, weight=1)
        self.news_frame.columnconfigure(0, weight=1)

    def _build_controls(self):
        self.rate_label = ttk.Label(
            self.main_frame,
            text="Enter New Interest Rate:",
            padding="5",
            font=("Helvetica", 20),
            style="Main.TLabel",
        )
        self.rate_label.grid(row=6, column=0, sticky=(tk.W, tk.E))

        self.rate_entry = ttk.Entry(self.main_frame, font=("Helvetica", 20))
        self.rate_entry.grid(row=6, column=1, sticky=tk.W)

        self.next_button = ttk.Button(
            self.main_frame,
            text="Next",
            command=self.next_turn,
            style="Main.TButton",
        )
        self.next_button.grid(row=6, column=2, sticky=(tk.W, tk.E))

    def _bind_events(self):
        self.root.bind("<Return>", lambda event: self.next_turn())

    def _configure_root_grid(self):
        for index in range(8):
            self.root.grid_rowconfigure(index, weight=1)
            self.root.grid_columnconfigure(index, weight=1)

    def bootstrap_initial_history(self):
        self._reset_economy_for_bootstrap()
        self._autorun_initial_history()
        self._activate_player_difficulty()
        self._sync_rate_entry_to_current_rate()
        self.update_ui()
        self.plot_graphs()

    def _reset_economy_for_bootstrap(self):
        if not hasattr(self, "scenario_name"):
            self.scenario_name = "Random"
        self.economy = Economy(
            difficulty="central_banker",
            scenario=self._sample_scenario(self.scenario_name),
        )
        self.economy.player_start_turn = PLAYER_START_TURN
        self._apply_scenario_initial_conditions()
        self.end_game_window = None
        self.graph_window_mode = "full"
        self.graph_split_mode = False
        self.current_term_start = PLAYER_START_TURN + 1 + offset
        self.news_text.delete("1.0", tk.END)
        self.economy.offset = offset
        self.economy.player_start_turn = PLAYER_START_TURN

    def _apply_scenario_initial_conditions(self):
        if self.scenario_name != "High Inflation":
            return
        self.economy.indicators.inflation_rate = 20.0
        self.economy.interest_rate = 6.0
        self.economy.indicators.unemployment_rate = 3.0
        self.economy._initialize_variables()


    def _activate_player_difficulty(self):
        difficulty = self.difficulty
        self.economy.difficulty = difficulty
        self.economy.event_cooldown_quarters = self.economy._difficulty_event_cooldown(difficulty)
        self.economy.shock_sd_scale = self.economy._difficulty_shock_scale(difficulty)
        self.economy.simplified_dynamics = difficulty == "principles"

    def _autorun_initial_history(self):
        total_turns = PLAYER_START_TURN + offset
        self._apply_bootstrap_persona()
        for idx in range(total_turns):
            self._apply_bootstrap_overrides_before_turn(idx, total_turns)
            self.economy.adjust_interest_rate_with_taylor()
            result = self.economy.simulate_quarter()
            result = self._apply_bootstrap_overrides_after_turn(idx, total_turns, result)
            if result.get("event") and self.economy.current_quarter > offset:
                self.news_text.insert(
                    tk.END,
                    f"Quarter {max(1, self.economy.current_quarter - offset)}: "
                    f"{result['event_name']}\n",
                )
                self.rate_entry.delete(0, tk.END)

    def _apply_bootstrap_persona(self):
        scenario_name = getattr(self, "scenario_name", "Random")
        if scenario_name == "Stable Economy":
            self.economy.cb_persona = "good"
        elif scenario_name == "Stagflation":
            self.economy.cb_persona = "dove"
        elif scenario_name == "High Inflation":
            self.economy.cb_persona = "careless"
        elif scenario_name == "Depression":
            self.economy.cb_persona = "hawk"

    def _apply_bootstrap_overrides_before_turn(self, idx, total_turns):
        if self.scenario_name == "Stable Economy" and idx >= total_turns - 10:
            self.economy.last_event_quarter = self.economy.current_quarter

        if self.scenario_name == "High Inflation":
            if getattr(self, "_hyperinflation_prob_boosted", False):
                return
            for event in self.economy.events:
                if event.name == "Spending Wave":
                    for term in event.prob_terms:
                        if term.label == "a_base":
                            original_fn = term.fn
                            term.fn = lambda h, _f=original_fn: min(1.0, 10 * float(_f(h)))
                            self._hyperinflation_prob_boosted = True

    def _apply_bootstrap_overrides_after_turn(self, idx, total_turns, result):
        three_before_player = (total_turns - 3)
        if idx == three_before_player:
            if self.scenario_name == "Depression":
                self._force_event_by_name("Major Financial Crisis")
            if self.scenario_name == "Stagflation":
                self._force_stagflation_supply_shock()

        if self.scenario_name == "High Inflation" and idx == total_turns - 1:
            if not self._has_past_event("Spending Wave"):
                self._force_event_by_name("Spending Wave")
        return result

    def _has_past_event(self, event_name):
        return any(event_name in quarter_events for quarter_events in self.economy.past_events)

    def _force_stagflation_supply_shock(self):
        history = self.economy._build_history_snapshot()
        weighted_candidates = []
        for event_name in ["Global Supply Shock", "Pandemic Outbreak", "Natural Disaster"]:
            event = next((e for e in self.economy.events if e.name == event_name), None)
            if event is None:
                continue
            weight = max(0.0, float(event.get_probability(history)))
            weighted_candidates.append((event.name, weight))

        if not weighted_candidates:
            return

        total_weight = sum(weight for _, weight in weighted_candidates)
        if total_weight <= 0:
            selected_name = weighted_candidates[0][0]
        else:
            import random

            names = [name for name, _ in weighted_candidates]
            weights = [weight for _, weight in weighted_candidates]
            selected_name = random.choices(names, weights=weights, k=1)[0]

        self._force_event_by_name(selected_name)

    def _force_event_by_name(self, event_name):
        event = next((e for e in self.economy.events if e.name == event_name), None)
        if event is None:
            return
        self.economy.enqueue_event(event)
        self.economy.apply_event_effects(dict(self.economy.effect_queue[0]))
        self.economy.effect_queue[0] = defaultdict(float)
        self.economy.past_events.append([event.name])
        self.economy.past_events = self.economy.past_events[-8:]
        if self.economy.current_quarter > offset:
            self.news_text.insert(
                tk.END,
                f"Quarter {max(1, self.economy.current_quarter - offset)}: {event.name}\n",
            )

    def _sync_rate_entry_to_current_rate(self):
        self.rate_entry.delete(0, tk.END)
        self.rate_entry.insert(0, f"{self.economy.interest_rate:.2f}")

    def _sample_scenario(self, scenario_name):
        return SCENARIOS.get(scenario_name)

    def configure_styles(self):
        self.style.configure("Main.TFrame", background=self.bg_color)
        self.style.configure("Main.TLabelframe", background=self.bg_color)
        self.style.configure(
            "Main.TLabelframe.Label",
            background=self.bg_color,
            foreground=self.text_color,
        )
        self.style.configure("Main.TLabel", background=self.bg_color, foreground=self.text_color)
        self.style.configure(
            "Main.TButton",
            background=self.button_bg_color,
            foreground=self.button_fg_color,
        )

        self.style.map("Main.TFrame", background=[("active", self.bg_color), ("!active", self.bg_color)])
        self.style.map(
            "Main.TLabelframe",
            background=[("active", self.bg_color), ("!active", self.bg_color)],
        )
        self.style.map("Main.TLabel", background=[("active", self.bg_color), ("!active", self.bg_color)])

        darker_button = self.adjust_color_brightness(self.button_bg_color, -20)
        lighter_button = self.adjust_color_brightness(self.button_bg_color, 10)
        self.style.map(
            "Main.TButton",
            foreground=[("pressed", self.button_fg_color), ("active", self.button_fg_color)],
            background=[("pressed", darker_button), ("active", lighter_button)],
        )

    def adjust_color_brightness(self, hex_color, brightness_offset):
        hex_color = hex_color.lstrip("#")
        red, green, blue = tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))

        red = max(0, min(255, red + brightness_offset))
        green = max(0, min(255, green + brightness_offset))
        blue = max(0, min(255, blue + brightness_offset))

        return f"#{red:02x}{green:02x}{blue:02x}"

    def print_window_size(self):
        width = self.root.winfo_width()
        height = self.root.winfo_height()
        print(f"Current window size: {width}x{height}")

        if width < 800 or height < 600:
            print("The window may fit well on a small screen.")
        else:
            print("The window may not fit well on the screen.")

    def freeze_initial_window_geometry(self):
        self.root.update_idletasks()
        width = self.root.winfo_width()
        height = self.root.winfo_height()
        self.root.geometry(f"{width}x{height}")

    def create_stats_panel(self):
        ttk.Label(self.stats_frame, text="Inflation Rate:", style="Main.TLabel").grid(
            row=0,
            column=0,
            sticky=(tk.W, tk.E),
        )
        self.inflation_label = ttk.Label(self.stats_frame, text="0.0%", style="Main.TLabel")
        self.inflation_label.grid(row=0, column=1, sticky=tk.W)

        ttk.Label(self.stats_frame, text="Unemployment Rate:", style="Main.TLabel").grid(
            row=1,
            column=0,
            sticky=(tk.W, tk.E),
        )
        self.unemployment_label = ttk.Label(
            self.stats_frame,
            text="0.0%",
            style="Main.TLabel",
        )
        self.unemployment_label.grid(row=1, column=1, sticky=tk.W)

        ttk.Label(self.stats_frame, text="Interest Rate:", style="Main.TLabel").grid(
            row=2,
            column=0,
            sticky=(tk.W, tk.E),
        )
        self.interest_rate_label = ttk.Label(
            self.stats_frame,
            text="0.0%",
            style="Main.TLabel",
        )
        self.interest_rate_label.grid(row=2, column=1, sticky=tk.W)

    def create_graph_panel(self):
        self.fig, self.ax = plt.subplots(figsize=(6, 4), dpi=80)
        self.current_event_name = None
        self.fig.set_dpi(80)
        self.fig.set_facecolor(self.bg_color)
        self.ax.set_facecolor("white")

        self.current_event_name = None
        self.canvas = FigureCanvasTkAgg(self.fig, self.graph_frame)
        self.canvas.draw()
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)
        self.graph_frame.grid_rowconfigure(0, weight=1)
        self.graph_frame.grid_columnconfigure(0, weight=1)

    def update_ui(self):
        state = self.economy.get_state()
        self.inflation_label.config(text=f"{state['inflation_rate']:.2f}%")
        self.unemployment_label.config(text=f"{state['unemployment_rate']:.2f}%")
        self.interest_rate_label.config(text=f"{state['interest_rate']:.2f}%")
        self.quarter_label.config(text=f"Quarter: {max(1, self.economy.current_quarter - offset)}")
        self.plot_graphs()

    def plot_graphs(self):
        histories = self._visible_histories()

        x = histories["quarters"]

        if self.graph_split_mode:
            self.fig.clf()
            ax_top = self.fig.add_subplot(2, 1, 1)
            ax_bottom = self.fig.add_subplot(2, 1, 2, sharex=ax_top)

            ax_top.set_facecolor("white")
            ax_top.plot(x, histories["inflation"], label="Inflation Rate", color=self.inflation_color)
            ax_top.plot(x, histories["interest_rate"], label="Interest Rate", linestyle="--", color=self.interest_rate_color)
            ax_top.set_ylabel("Percentage")
            ax_top.legend(fontsize=8)
            ax_top.grid(True, which="major", linewidth=0.8, alpha=0.4)

            ax_bottom.set_facecolor("white")
            ax_bottom.plot(x, histories["unemployment"], label="Unemployment Rate", color=self.unemployment_color)
            if self.difficulty == "principles":
                ax_bottom.plot(x, histories["natural_unemployment"], label="Natural Unemployment", linestyle=":", color="black")
            ax_bottom.set_xlabel("Quarter")
            ax_bottom.set_ylabel("Percentage")
            ax_bottom.set_ylim(bottom=0)
            ax_bottom.legend(fontsize=8)
            ax_bottom.grid(True, which="major", linewidth=0.8, alpha=0.4)
            if self.graph_window_mode == "recent":
                ax_bottom.xaxis.set_major_locator(MaxNLocator(integer=True))

            self.ax = ax_top
            self._draw_event_banner()
        else:
            self.fig.clf()
            self.ax = self.fig.add_subplot(1, 1, 1)
            self.ax.clear()
            self.ax.set_facecolor("white")
            self.ax.plot(x, histories["inflation"], label="Inflation Rate", color=self.inflation_color)
            self.ax.plot(x, histories["unemployment"], label="Unemployment Rate", color=self.unemployment_color)
            self.ax.plot(x, histories["interest_rate"], label="Interest Rate", linestyle="--", color=self.interest_rate_color)
            if self.difficulty == "principles":
                self.ax.plot(x, histories["natural_unemployment"], label="Natural Unemployment", linestyle=":", color="black")
            self.ax.set_xlabel("Quarter")
            self.ax.set_ylabel("Percentage")
            self.ax.legend(fontsize=8)
            self.ax.minorticks_on()
            self.ax.grid(True, which="major", linewidth=0.8, alpha=0.4)
            self.ax.grid(True, which="minor", linewidth=0.5, alpha=0.2)
            if self.graph_window_mode == "recent":
                self.ax.xaxis.set_major_locator(MaxNLocator(integer=True))
            self._draw_event_banner()

        self.fig.tight_layout()
        self.canvas.draw()

    def _visible_histories(self):
        window = 20 if self.graph_window_mode == "recent" else None

        inflation = self.economy.variables.get_history("inflation_rate")[offset:]
        unemployment = self.economy.variables.get_history("unemployment_rate")[offset:]
        interest_rate = self.economy.variables.get_history("interest_rate")[offset:]
        natural_unemployment = self.economy.variables.get_history("natural_unemployment_rate")[offset:]
        reputation = self.economy.variables.get_history("cb_reputation")[offset:]

        total = len(inflation)
        start_idx = max(0, total - window) if window is not None else 0
        q_start = 1 + start_idx
        quarters = list(range(q_start, q_start + (total - start_idx)))

        return {
            "quarters": quarters,
            "inflation": inflation[start_idx:],
            "unemployment": unemployment[start_idx:],
            "interest_rate": interest_rate[start_idx:],
            "natural_unemployment": natural_unemployment[start_idx:],
            "reputation": reputation[start_idx:],
        }

    def _draw_event_banner(self):
        if getattr(self, "current_event_name", None):
            self.ax.text(
                0.5,
                0.92,
                self.current_event_name,
                transform=self.ax.transAxes,
                ha="center",
                va="top",
                color="red",
                fontsize=16,
                fontweight="bold",
                bbox=dict(
                    facecolor="white",
                    alpha=0.7,
                    edgecolor="none",
                    boxstyle="round,pad=0.3",
                ),
            )

    def toggle_graph_window_mode(self):
        self.graph_window_mode = "recent" if self.graph_window_mode == "full" else "full"
        self.view_toggle_button.config(
            text="History: Recent" if self.graph_window_mode == "recent" else "History: Full"
        )
        self.plot_graphs()

    def toggle_graph_split_mode(self):
        self.graph_split_mode = not self.graph_split_mode
        self.split_toggle_button.config(
            text="Layout: Split" if self.graph_split_mode else "Layout: Combined"
        )
        self.plot_graphs()

    def next_turn(self):
        try:
            new_rate = self._parse_rate_entry()
            self._confirm_rate_change_if_needed(new_rate)
            self.economy.adjust_interest_rate(new_rate)
        except ValueError:
            messagebox.showwarning(
                "Invalid Input",
                "Please enter a valid number for the interest rate.",
            )
            return

        result = self.economy.simulate_quarter()
        self._apply_turn_result(result)
        self.update_ui()
        self.current_event_name = None

        if self.economy.current_quarter >= self.current_term_start + self.term_length:
            self.check_end_of_game()

    def _parse_rate_entry(self):
        new_rate = float(self.rate_entry.get())
        if new_rate < 0:
            messagebox.showwarning("Invalid Input", "Interest rate cannot be negative.")
            raise ValueError("negative rate")
        return new_rate

    def _confirm_rate_change_if_needed(self, new_rate):
        current_rate = self.economy.interest_rate
        current_inflation = self.economy.indicators.inflation_rate

        if new_rate > current_rate * 9 and new_rate > current_inflation + 10:
            answer = messagebox.askyesno(
                "Confirm High Rate",
                f"You are setting the interest rate to {new_rate:.2f}.%\n"
                "This is a very large increase. Are you sure?",
            )
            if not answer:
                self.rate_entry.delete(0, tk.END)
                self.rate_entry.insert(0, f"{self.economy.interest_rate:.2f}")
                raise ValueError("rate change cancelled")

    def _apply_turn_result(self, result):
        if result.get("event"):
            self.news_text.insert(
                tk.END,
                f"Quarter {max(1, self.economy.current_quarter - offset)}: "
                f"{result['event_name']}\n",
            )
            self.news_text.see(tk.END)
            self.latest_event_label.config(
                text=f"{result['event_name']}\n    • {result['event']}"
            )
            self.current_event_name = result["event_name"]
            #self.rate_entry.delete(0, tk.END)
            #disabled for tests
            return

        self.latest_event_label.config(text="")
        self.current_event_name = None

    def check_end_of_game(self):
        self.next_button.config(state=tk.DISABLED)
        final_inflation = self.economy.indicators.inflation_rate
        final_unemployment = self.economy.indicators.unemployment_rate

        if final_inflation < 2 and final_unemployment < 7:
            # Likely intent issue preserved for equivalence:
            # this branch has no fallback assignment, so some initial-state
            # combinations can leave `message` undefined.
            # Intended alternative:
            # else:
            #     message = "Stable inflation and employment, with room for improvement."
            if self.initial_inflation < 2 and self.initial_unemployment < 7:
                message = (
                    "Excellent work! You've maintained a stable economy throughout "
                    "your term. The nation thrives under your steady leadership."
                )
            elif self.initial_unemployment >= 15:
                message = (
                    "From challenges to triumph! You've successfully reduced "
                    "unemployment and stabilized the economy. Your efforts have "
                    "truly made a difference."
                )
            elif self.initial_inflation >= 3:
                message = (
                    "Inflation tamed! Your strategic decisions have brought "
                    "stability to the economy. Keep up the great work!"
                )
        elif final_inflation >= 100:
            message = (
                "Inflation has skyrocketed to astronomical levels! Perhaps it's "
                "time to consider a career in space exploration instead. 🚀"
            )
        elif final_inflation > 10:
            if final_inflation > self.initial_inflation + 2:
                message = (
                    "Inflation has risen significantly during your term. The economy "
                    "faces challenges ahead. Consider new strategies if you choose "
                    "to continue."
                )
            elif final_inflation < self.initial_inflation:
                message = (
                    "While inflation remains high, you've made progress in "
                    "controlling it. Keep refining your approach to further improve "
                    "the economy."
                )
        elif final_unemployment > 10:
            if final_unemployment > self.initial_unemployment:
                message = (
                    "Unemployment has increased during your term. Addressing this "
                    "issue will be crucial for economic recovery."
                )
            else:
                message = (
                    "You've made strides in reducing unemployment, but there's "
                    "still work to be done. Continue your efforts to bring further "
                    "improvements."
                )
        else:
            message = (
                "Your term has ended with mixed results. The economy has faced both "
                "ups and downs. Reflect on your strategies and consider new "
                "approaches moving forward."
            )

        self.show_end_game_message(message)

    def show_end_game_message(self, message):
        if self.end_game_window and self.end_game_window.winfo_exists():
            return

        self.end_game_window = tk.Toplevel(self.root)
        self.end_game_window.title("End of Game")
        self.end_game_window.transient(self.root)
        self.end_game_window.grab_set()
        self.end_game_window.protocol("WM_DELETE_WINDOW", lambda: None)

        end_game_frame = ttk.Frame(self.end_game_window, style="Main.TFrame", padding=10)
        end_game_frame.pack(fill=tk.BOTH, expand=True)

        message_label = ttk.Label(
            end_game_frame,
            text=message,
            wraplength=600,
            justify=tk.CENTER,
            padding=20,
            style="Main.TLabel",
        )
        message_label.pack(pady=20)

        button_frame = ttk.Frame(end_game_frame, style="Main.TFrame")
        button_frame.pack(pady=20)

        continue_button = ttk.Button(
            button_frame,
            text="Continue Playing",
            command=lambda: self.on_continue(self.end_game_window),
            style="Main.TButton",
        )
        continue_button.pack(side=tk.LEFT, padx=20)

        retire_button = ttk.Button(
            button_frame,
            text="Retire",
            command=lambda: self.on_retire(self.end_game_window),
            style="Main.TButton",
        )
        retire_button.pack(side=tk.RIGHT, padx=20)

    def on_continue(self, window):
        window.grab_release()
        window.destroy()
        self.current_term_start = self.economy.current_quarter + 1
        self.next_button.config(state=tk.NORMAL)

    def on_retire(self, window):
        window.grab_release()
        window.destroy()
        self.next_button.config(state=tk.DISABLED)
        self.rate_entry.config(state=tk.DISABLED)
        self._compress_layout_for_post_retire()

        self.end_label = ttk.Label(
            self.main_frame,
            text="Game Over — You Retired",
            font=("Helvetica", 20),
            style="Main.TLabel",
        )
        self.end_label.grid(row=7, column=0, columnspan=3, pady=15)

        self.post_retire_actions_frame = ttk.Frame(self.main_frame, style="Main.TFrame")
        self.post_retire_actions_frame.grid(row=8, column=0, columnspan=3, sticky=(tk.W, tk.E), padx=4)
        for column in range(3):
            self.post_retire_actions_frame.grid_columnconfigure(column, weight=1)

        self.play_again_button = ttk.Button(
            self.post_retire_actions_frame,
            text="Play Again (Same Settings)",
            command=self.new_game,
        )
        self.play_again_button.grid(row=0, column=0, sticky=(tk.W, tk.E), padx=2)

        self.main_menu_button = ttk.Button(
            self.post_retire_actions_frame,
            text="Main Menu",
            command=self.return_to_main_menu,
        )
        self.main_menu_button.grid(row=0, column=1, sticky=(tk.W, tk.E), padx=2)

        self.save_graph_button = ttk.Button(
            self.post_retire_actions_frame,
            text="Save Chart",
            command=self.save_chart,
        )
        self.save_graph_button.grid(row=0, column=2, sticky=(tk.W, tk.E), padx=2)

    def _compress_layout_for_post_retire(self):
        self.news_text.configure(height=3)
        self.latest_event_label.configure(font=("Helvetica", 13, "bold"), height=2, wraplength=560)

    def show_event_details(self, event):
        event_window = tk.Toplevel(self.root)
        event_window.title("Event Details")

        event_frame = ttk.Frame(event_window, style="Main.TFrame", padding=10)
        event_frame.pack(fill=tk.BOTH, expand=True)

        event_text = tk.Text(
            event_frame,
            font=("Helvetica", 25),
            height=2,
            wrap="word",
            background="white",
        )
        event_text.insert(tk.END, event)
        event_text.config(state=tk.DISABLED)
        event_text.pack(padx=5, pady=5, fill=tk.BOTH, expand=True)

        ok_button = ttk.Button(
            event_frame,
            text="OK",
            command=event_window.destroy,
            style="Main.TButton",
        )
        ok_button.pack(pady=5)

    def reset_graph_panel(self):
        if hasattr(self, "canvas"):
            self.canvas.get_tk_widget().destroy()

        self.fig, self.ax = plt.subplots(figsize=(6, 4), dpi=80)
        self.fig.set_facecolor(self.bg_color)
        self.ax.set_facecolor("white")
        self.canvas = FigureCanvasTkAgg(self.fig, self.graph_frame)
        self.canvas.draw()
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)

    def new_game(self):
        self.next_button.config(state=tk.NORMAL)
        self.rate_entry.config(state=tk.NORMAL)
        self._restore_layout_defaults()
        if hasattr(self, "end_label"):
            self.end_label.destroy()
        if hasattr(self, "play_again_button"):
            self.play_again_button.destroy()
        if hasattr(self, "main_menu_button"):
            self.main_menu_button.destroy()
        if hasattr(self, "save_graph_button"):
            self.save_graph_button.destroy()
        if hasattr(self, "post_retire_actions_frame"):
            self.post_retire_actions_frame.destroy()

        self.reset_graph_panel()
        self.bootstrap_initial_history()

    def return_to_main_menu(self):
        self.main_frame.destroy()
        GameLauncher(self.root)

    def _restore_layout_defaults(self):
        self.news_text.configure(height=5)
        self.latest_event_label.configure(font=("Helvetica", 16, "bold"), height=3, wraplength=600)

    def save_chart(self):
        charts_dir = Path.home() / "EconGame" / "charts"
        charts_dir.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        png_path = charts_dir / f"economy_{timestamp}.png"
        pdf_path = charts_dir / f"economy_{timestamp}.pdf"

        self.fig.savefig(png_path, dpi=200, bbox_inches="tight")
        with PdfPages(pdf_path) as pdf:
            pdf.savefig(self.fig, bbox_inches="tight")

        messagebox.showinfo("Saved", f"Chart saved:\n{png_path}")


def main():
    root = tk.Tk()
    try:
        ctypes.CDLL("/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation")
    except Exception:
        pass

    GameLauncher(root)
    root.mainloop()


class GameLauncher:
    def __init__(self, root):
        self.root = root
        self.frame = ttk.Frame(root, padding=16)
        self.frame.pack(fill=tk.BOTH, expand=True)
        self.difficulty = tk.StringVar(value="principles")
        self.scenario = tk.StringVar(value="Random")
        self.mandate = tk.StringVar(value="Inflation Target (future)")
        self._build()

    def _build(self):
        ttk.Label(self.frame, text=APP_TITLE, font=("Helvetica", 24)).pack(pady=6)
        ttk.Button(self.frame, text="Load Game (coming soon)", command=self._load_stub).pack(fill=tk.X, pady=4)
        ttk.Label(self.frame, text="Create New Game").pack(anchor="w", pady=(12, 2))
        diff_frame = ttk.Frame(self.frame)
        diff_frame.pack(fill=tk.X)
        options = [
            ("Principles (easy)", "principles"),
            ("Senior (medium)", "senior"),
            ("Central Banker", "central_banker"),
        ]
        for label, value in options:
            ttk.Radiobutton(diff_frame, text=label, variable=self.difficulty, value=value).pack(anchor="w")
        ttk.Button(diff_frame, text="Custom (disabled for now)", state=tk.DISABLED).pack(anchor="w", pady=2)

        ttk.Label(self.frame, text="Scenario").pack(anchor="w", pady=(10, 2))
        scn = ttk.Frame(self.frame)
        scn.pack(fill=tk.X)
        for name in SCENARIOS.keys():
            ttk.Radiobutton(scn, text=name, variable=self.scenario, value=name).pack(anchor="w")

        ttk.Label(self.frame, text="Central Bank Mandate (future)").pack(anchor="w", pady=(10, 2))
        mandate_box = ttk.Combobox(
            self.frame,
            textvariable=self.mandate,
            state="readonly",
            values=["Inflation Target (future)", "Dual Mandate (future)", "Other (future)"],
        )
        mandate_box.pack(fill=tk.X)
        mandate_box.current(0)
        ttk.Button(self.frame, text="Start New Game", command=self._start_game).pack(fill=tk.X, pady=(12, 4))
        ttk.Button(self.frame, text="Run Batch Simulations", command=self._batch_test_dialog).pack(fill=tk.X, pady=4)

    def _load_stub(self):
        messagebox.showinfo("Load Game", "Load game will be added in a future update.")

    def _start_game(self):
        self.frame.destroy()
        EconomicGameApp(self.root, difficulty=self.difficulty.get(), scenario_name=self.scenario.get())

    def _batch_test_dialog(self):
        top = tk.Toplevel(self.root)
        top.title("Batch Simulation Test")
        ttk.Label(top, text="Number of simulations").pack(padx=10, pady=(10, 2))
        entry = ttk.Entry(top)
        entry.insert(0, "100")
        entry.pack(padx=10, pady=4)
        ttk.Label(top, text="Turns per simulation").pack(padx=10, pady=(6, 2))
        turns_entry = ttk.Entry(top)
        turns_entry.insert(0, "100")
        turns_entry.pack(padx=10, pady=4)

        ttk.Label(top, text="Auto-play initialization turns").pack(padx=10, pady=(6, 2))
        init_turns_entry = ttk.Entry(top)
        init_turns_entry.insert(0, "40")
        init_turns_entry.pack(padx=10, pady=4)

        ttk.Label(top, text="Difficulty").pack(padx=10, pady=(6, 2))
        batch_difficulty = tk.StringVar(value=self.difficulty.get())
        ttk.Combobox(top, textvariable=batch_difficulty, state="readonly", values=["principles", "senior", "central_banker"]).pack(padx=10, pady=4)

        ttk.Label(top, text="Persona").pack(padx=10, pady=(6, 2))
        batch_persona = tk.StringVar(value="random")
        ttk.Combobox(top, textvariable=batch_persona, state="readonly", values=["random", "good", "dove", "hawk", "careless"]).pack(padx=10, pady=4)

        ttk.Label(top, text="Scenario").pack(padx=10, pady=(6, 2))
        batch_scenario = tk.StringVar(value=self.scenario.get())
        ttk.Combobox(top, textvariable=batch_scenario, state="readonly", values=list(SCENARIOS.keys())).pack(padx=10, pady=4)

        out = tk.Text(top, width=70, height=14)
        out.pack(padx=10, pady=10)

        def run():
            import numpy as np
            n = max(1, int(entry.get()))
            turns = max(1, int(turns_entry.get()))
            init_turns = max(0, int(init_turns_entry.get()))
            infl_series = []
            unemp_series = []
            natural_unemp_initial = []
            natural_unemp_final = []
            natural_unemp_series = []
            interest_initial = []
            interest_final = []
            interest_series = []
            real_rate_eq_initial = []
            real_rate_eq_final = []
            real_rate_eq_series = []
            zlb_turns = 0
            max_zlb_spells = []
            financial_crisis_count = 0
            major_financial_crisis_count = 0
            errors = 0
            first_error = None
            total_turns_simulated = 0
            total_events_fired = 0
            successful_runs = 0
            selected_scenario = SCENARIOS.get(batch_scenario.get())

            for _ in range(n):
                try:
                    econ = Economy(difficulty="central_banker", scenario=selected_scenario)

                    scenario_bootstrap_persona = {
                        "Stable Economy": "good",
                        "Stagflation": "dove",
                        "High Inflation": "careless",
                        "Depression": "hawk",
                    }.get(batch_scenario.get())
                    if scenario_bootstrap_persona is not None:
                        econ.cb_persona = scenario_bootstrap_persona

                    def event_has_economic_impact(event_name):
                        if not event_name:
                            return False
                        event = next((e for e in econ.events if e.name == event_name), None)
                        if event is None:
                            return False
                        for values in event.effects_schedule.values():
                            if isinstance(values, list):
                                if any(abs(v) > 1e-12 for v in values):
                                    return True
                            elif abs(values) > 1e-12:
                                return True
                        return False

                    run_max_zlb_spell = 0
                    current_zlb_spell = 0

                    for __ in range(init_turns):
                        econ.adjust_interest_rate_with_taylor()
                        result = econ.simulate_quarter()
                        total_turns_simulated += 1
                        event_name = result.get("event_name")
                        if event_has_economic_impact(event_name):
                            total_events_fired += 1
                        if event_name == "Financial Crisis":
                            financial_crisis_count += 1
                        elif event_name == "Major Financial Crisis":
                            major_financial_crisis_count += 1

                    econ.difficulty = batch_difficulty.get()
                    econ.event_cooldown_quarters = econ._difficulty_event_cooldown(econ.difficulty)
                    econ.shock_sd_scale = econ._difficulty_shock_scale(econ.difficulty)
                    econ.simplified_dynamics = econ.difficulty == "principles"

                    if batch_persona.get() == "random":
                        econ.cb_persona = econ._draw_cb_persona()
                    else:
                        econ.cb_persona = batch_persona.get()

                    natural_unemp_initial.append(econ.indicators.natural_unemployment_rate)
                    interest_initial.append(econ.interest_rate)
                    real_rate_eq_initial.append(econ.indicators.real_rate_eq)

                    for __ in range(turns):
                        econ.adjust_interest_rate_with_taylor()
                        result = econ.simulate_quarter()
                        total_turns_simulated += 1
                        event_name = result.get("event_name")
                        if event_has_economic_impact(event_name):
                            total_events_fired += 1
                        if event_name == "Financial Crisis":
                            financial_crisis_count += 1
                        elif event_name == "Major Financial Crisis":
                            major_financial_crisis_count += 1

                        infl_series.append(econ.indicators.inflation_rate)
                        unemp_series.append(econ.indicators.unemployment_rate)
                        natural_unemp_series.append(econ.indicators.natural_unemployment_rate)
                        interest_series.append(econ.interest_rate)
                        real_rate_eq_series.append(econ.indicators.real_rate_eq)
                        if econ.interest_rate == 0 and econ.indicators.inflation_rate <= 0:
                            zlb_turns += 1
                            current_zlb_spell += 1
                            run_max_zlb_spell = max(run_max_zlb_spell, current_zlb_spell)
                        else:
                            current_zlb_spell = 0

                    max_zlb_spells.append(run_max_zlb_spell)
                    successful_runs += 1

                    natural_unemp_final.append(econ.indicators.natural_unemployment_rate)
                    interest_final.append(econ.interest_rate)
                    real_rate_eq_final.append(econ.indicators.real_rate_eq)

                except Exception as exc:
                    errors += 1
                    if first_error is None:
                        first_error = f"{type(exc).__name__}: {exc}"
            infl = np.array(infl_series)
            unemp = np.array(unemp_series)
            natural_unemp = np.array(natural_unemp_series)
            interest = np.array(interest_series)
            real_rate_eq = np.array(real_rate_eq_series)
            out.delete("1.0", tk.END)
            out.insert(tk.END, f"Difficulty: {batch_difficulty.get()}\nPersona: {batch_persona.get()}\nScenario: {batch_scenario.get()}\nRuns: {n}\nAuto-play init turns: {init_turns}\nPlayer turns: {turns}\n")
            event_rate = (total_events_fired / total_turns_simulated) if total_turns_simulated else 0.0
            out.insert(tk.END, f"Total turns simulated: {total_turns_simulated}\n")
            out.insert(tk.END, f"Economic-impact events fired: {total_events_fired} (rate: {event_rate:.1%})\n")
            out.insert(tk.END, f"Financial Crisis events: {financial_crisis_count}\n")
            out.insert(tk.END, f"Major Financial Crisis events: {major_financial_crisis_count}\n")
            if len(infl) == 0 or len(unemp) == 0:
                out.insert(tk.END, "No valid simulation data collected.\n")
            else:
                out.insert(tk.END, "(All distribution stats below are based on player turns only.)\n")
                out.insert(tk.END, f"Inflation mean/median: {infl.mean():.2f} / {np.median(infl):.2f}\n")
                out.insert(tk.END, f"Unemployment mean/median: {unemp.mean():.2f} / {np.median(unemp):.2f}\n")
                out.insert(tk.END, f"Natural unemployment (initial/final mean): {np.mean(natural_unemp_initial):.2f} / {np.mean(natural_unemp_final):.2f}\n")
                out.insert(tk.END, f"Natural unemployment (player-turn mean/median): {natural_unemp.mean():.2f} / {np.median(natural_unemp):.2f}\n")
                out.insert(tk.END, f"Interest rate (initial/final mean): {np.mean(interest_initial):.2f} / {np.mean(interest_final):.2f}\n")
                out.insert(tk.END, f"Interest rate (player-turn mean/median): {interest.mean():.2f} / {np.median(interest):.2f}\n")
                out.insert(tk.END, f"real_rate_eq (initial/final mean): {np.mean(real_rate_eq_initial):.2f} / {np.mean(real_rate_eq_final):.2f}\n")
                out.insert(tk.END, f"real_rate_eq (player-turn mean/median): {real_rate_eq.mean():.2f} / {np.median(real_rate_eq):.2f}\n")
                out.insert(tk.END, f"Turns at ZLB (i=0 and inflation<=0): {zlb_turns} ({(zlb_turns / len(infl)):.1%} of player turns)\n")
                if successful_runs > 0:
                    out.insert(tk.END, f"Average longest ZLB spell per run: {np.mean(max_zlb_spells):.2f} turns\n")
                out.insert(tk.END, f"P(inflation < 3%): {(infl < 3).mean():.1%}\n")
                out.insert(tk.END, f"P(unemployment < 7%): {(unemp < 7).mean():.1%}\n")
                out.insert(tk.END, f"P(stagflation: infl>5 and unemp>8): {((infl > 5) & (unemp > 8)).mean():.1%}\n")
            out.insert(tk.END, f"Errors: {errors}\n")
            if first_error is not None:
                out.insert(tk.END, f"First error: {first_error}\n")

        ttk.Button(top, text="Run", command=run).pack(pady=(0, 10))


if __name__ == "__main__":
    main()
