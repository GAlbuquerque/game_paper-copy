#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 13:17:54 2025

@author: gustavo
"""

from datetime import datetime
from pathlib import Path
import ctypes
import tkinter as tk
from tkinter import messagebox, ttk

import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

from economy import Economy


offset = 10  # hidden turns
APP_TITLE = "Policy Interest Rate Simulator"
SCENARIOS = {
    "Random": None,
    "Stable Economy": None,
    "Stagflation": None,
    "Hyperinflation": None,
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
            difficulty=self.difficulty,
            scenario=self._sample_scenario(self.scenario_name),
        )
        # Likely intent issue preserved for equivalence:
        # bootstrap_initial_history() replaces self.economy, but these baselines are
        # not refreshed there or in new_game(). End-of-term text therefore compares
        # against the first Economy built here, not the live run that follows.
        # Intended alternative:
        # self.initial_inflation = self.economy.indicators.inflation_rate
        # self.initial_unemployment = self.economy.indicators.unemployment_rate
        self.initial_inflation = self.economy.indicators.inflation_rate
        self.initial_unemployment = self.economy.indicators.unemployment_rate
        self.current_term_start = 41
        self.term_length = 16
        self.current_event_name = None
        self.end_game_window = None

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
        self.create_graph_panel()

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
        self._sync_rate_entry_to_current_rate()
        self.update_ui()
        self.plot_graphs()

    def _reset_economy_for_bootstrap(self):
        if not hasattr(self, "scenario_name"):
            self.scenario_name = "Random"
        self.economy = Economy(
            difficulty=self.difficulty,
            scenario=self._sample_scenario(self.scenario_name),
        )
        self.end_game_window = None
        self.current_term_start = 41 + offset
        self.news_text.delete("1.0", tk.END)
        self.economy.offset = offset

    def _autorun_initial_history(self):
        total_turns = 40 + offset
        self._set_bootstrap_difficulty_overrides()
        self._apply_bootstrap_persona()
        try:
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
        finally:
            self._restore_bootstrap_difficulty_overrides()

    def _set_bootstrap_difficulty_overrides(self):
        self._bootstrap_difficulty_backup = (
            self.economy.event_cooldown_quarters,
            self.economy.shock_sd_scale,
            self.economy.simplified_dynamics,
        )
        self.economy.event_cooldown_quarters = 0
        self.economy.shock_sd_scale = 1.0
        self.economy.simplified_dynamics = False

    def _restore_bootstrap_difficulty_overrides(self):
        if not hasattr(self, "_bootstrap_difficulty_backup"):
            return
        (
            self.economy.event_cooldown_quarters,
            self.economy.shock_sd_scale,
            self.economy.simplified_dynamics,
        ) = self._bootstrap_difficulty_backup

    def _apply_bootstrap_persona(self):
        scenario_name = getattr(self, "scenario_name", "Random")
        if scenario_name == "Stable Economy":
            self.economy.cb_persona = "good"
        elif scenario_name == "Stagflation":
            self.economy.cb_persona = "dove"
        elif scenario_name == "Hyperinflation":
            self.economy.cb_persona = "careless"
        elif scenario_name == "Depression":
            self.economy.cb_persona = "hawk"

    def _apply_bootstrap_overrides_before_turn(self, idx, total_turns):
        if self.scenario_name == "Stable Economy" and idx >= total_turns - 10:
            self.economy.last_event_quarter = self.economy.current_quarter

        if self.scenario_name == "Hyperinflation":
            if getattr(self, "_hyperinflation_prob_boosted", False):
                return
            for event in self.economy.events:
                if event.name == "Spending Wave":
                    for term in event.prob_terms:
                        if term.label == "a_base":
                            original_fn = term.fn
                            term.fn = lambda h, _f=original_fn: min(1.0, 3 * float(_f(h)))
                            self._hyperinflation_prob_boosted = True

    def _apply_bootstrap_overrides_after_turn(self, idx, total_turns, result):
        two_before_player = (total_turns - 2)
        if idx == two_before_player:
            if self.scenario_name == "Depression":
                self._force_event_by_name("Major Financial Crisis")
            if self.scenario_name == "Stagflation":
                self._force_stagflation_supply_shock()

        if self.scenario_name == "Hyperinflation" and idx == total_turns - 1:
            if not self._has_past_event("Spending Wave"):
                self._force_event_by_name("Spending Wave")
        return result

    def _has_past_event(self, event_name):
        return any(event_name in quarter_events for quarter_events in self.economy.past_events)

    def _force_stagflation_supply_shock(self):
        candidate_events = [
            "Global Supply Shock",
            "Pandemic Outbreak",
            "Natural Disaster",
        ]
        for event_name in candidate_events:
            if any(event.name == event_name for event in self.economy.events):
                self._force_event_by_name(event_name)
                return

    def _force_event_by_name(self, event_name):
        event = next((e for e in self.economy.events if e.name == event_name), None)
        if event is None:
            return
        self.economy.enqueue_event(event)
        self.economy.apply_event_effects(dict(self.economy.effect_queue[0]))
        self.economy.effect_queue[0] = {}
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
        self.ax.clear()
        self.ax.set_facecolor("white")

        histories = self._visible_histories()
        self.ax.plot(histories["inflation"], label="Inflation Rate", color=self.inflation_color)
        self.ax.plot(
            histories["unemployment"],
            label="Unemployment Rate",
            color=self.unemployment_color,
        )
        self.ax.plot(
            histories["interest_rate"],
            label="Interest Rate",
            linestyle="--",
            color=self.interest_rate_color,
        )

        if self.current_term_start <= len(histories["inflation"]) + offset:
            self.ax.axvline(x=40, color=self.term_line_color, linestyle="--")

        self.ax.set_xlabel("Quarter")
        self.ax.set_ylabel("Percentage")
        self.ax.legend(fontsize=8)
        self.ax.minorticks_on()
        self.ax.grid(True, which="major", linewidth=0.8, alpha=0.4)
        self.ax.grid(True, which="minor", linewidth=0.5, alpha=0.2)
        self.fig.tight_layout()
        self._draw_event_banner()
        self.canvas.draw()

    def _visible_histories(self):
        return {
            "inflation": self.economy.variables.get_history("inflation_rate")[offset:],
            "unemployment": self.economy.variables.get_history("unemployment_rate")[offset:],
            "interest_rate": self.economy.variables.get_history("interest_rate")[offset:],
            "natural_unemployment": self.economy.variables.get_history("natural_unemployment_rate")[offset:],
            "reputation": self.economy.variables.get_history("cb_reputation")[offset:],
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
            return

        self.latest_event_label.config(text="")
        self.current_event_name = None

    def check_end_of_game(self):
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
        window.destroy()
        self.current_term_start = self.economy.current_quarter + 1
        self.next_button.config(state=tk.NORMAL)

    def on_retire(self, window):
        window.destroy()
        self.next_button.config(state=tk.DISABLED)
        self.rate_entry.config(state=tk.DISABLED)

        self.end_label = ttk.Label(
            self.main_frame,
            text="Game Over — You Retired",
            font=("Helvetica", 20),
            style="Main.TLabel",
        )
        self.end_label.grid(row=7, column=0, columnspan=3, pady=15)

        self.new_game_button = ttk.Button(
            self.main_frame,
            text="New Game",
            command=self.new_game,
        )
        self.new_game_button.grid(row=8, column=1, sticky=(tk.W, tk.E), padx=4)

        self.save_graph_button = ttk.Button(
            self.main_frame,
            text="Save Chart",
            command=self.save_chart,
        )
        self.save_graph_button.grid(row=8, column=2, sticky=(tk.W, tk.E), padx=4)

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
        if hasattr(self, "end_label"):
            self.end_label.destroy()
        if hasattr(self, "new_game_button"):
            self.new_game_button.destroy()
        if hasattr(self, "save_graph_button"):
            self.save_graph_button.destroy()

        self.reset_graph_panel()
        self.bootstrap_initial_history()

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
        self.difficulty = tk.StringVar(value="central_banker")
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
        entry.insert(0, "25")
        entry.pack(padx=10, pady=4)
        out = tk.Text(top, width=70, height=14)
        out.pack(padx=10, pady=10)

        def run():
            import numpy as np
            n = max(1, int(entry.get()))
            finals = []
            for _ in range(n):
                econ = Economy(difficulty=self.difficulty.get(), scenario=None)
                for __ in range(40):
                    econ.adjust_interest_rate_with_taylor()
                    econ.simulate_quarter()
                finals.append((econ.indicators.inflation_rate, econ.indicators.unemployment_rate))
            infl = np.array([x[0] for x in finals])
            unemp = np.array([x[1] for x in finals])
            out.delete("1.0", tk.END)
            out.insert(tk.END, f"Difficulty: {self.difficulty.get()}\nRuns: {n}\n")
            out.insert(tk.END, f"Inflation mean/median: {infl.mean():.2f} / {np.median(infl):.2f}\n")
            out.insert(tk.END, f"Unemployment mean/median: {unemp.mean():.2f} / {np.median(unemp):.2f}\n")
            out.insert(tk.END, f"P(inflation < 3%): {(infl < 3).mean():.1%}\n")
            out.insert(tk.END, f"P(unemployment < 7%): {(unemp < 7).mean():.1%}\n")
            out.insert(tk.END, f"P(stagflation: infl>5 and unemp>8): {((infl > 5) & (unemp > 8)).mean():.1%}\n")

        ttk.Button(top, text="Run", command=run).pack(pady=(0, 10))


if __name__ == "__main__":
    main()
