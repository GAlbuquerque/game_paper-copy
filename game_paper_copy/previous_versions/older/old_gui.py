#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Mar  2 13:38:35 2025

@author: gustavo
"""

import tkinter as tk
from tkinter import ttk, messagebox
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from economy import Economy

class EconomicGameApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Economic Simulation Game")
        self.economy = Economy()
        self.initial_inflation = self.economy.indicators.inflation_rate
        self.initial_unemployment = self.economy.indicators.unemployment_rate
        self.current_term_start = 41
        self.term_length = 16

        # Set up the main frame
        self.main_frame = ttk.Frame(root, padding="10")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Title Label
        self.title_label = ttk.Label(self.main_frame, text="Economic Simulation Game", font=("Helvetica", 16))
        self.title_label.grid(row=0, column=0, columnspan=2, pady=5)

        # Quarter Label
        self.quarter_label = ttk.Label(self.main_frame, text=f"Quarter: {self.economy.current_quarter}", font=("Helvetica", 12))
        self.quarter_label.grid(row=1, column=0, columnspan=2, pady=5)

        # Statistics Panel
        self.stats_frame = ttk.LabelFrame(self.main_frame, text="Economic Indicators", padding="10")
        self.stats_frame.grid(row=2, column=0, columnspan=2, pady=10, sticky=(tk.W, tk.E))

        self.create_stats_panel()

        # Graph Panel
        self.graph_frame = ttk.LabelFrame(self.main_frame, text="Economic Graphs", padding="10")
        self.graph_frame.grid(row=3, column=0, columnspan=2, pady=10, sticky=(tk.W, tk.E))

        self.create_graph_panel()

        # News Feed
        self.news_frame = ttk.LabelFrame(self.main_frame, text="News Feed", padding="10")
        self.news_frame.grid(row=4, column=0, columnspan=2, pady=10, sticky=(tk.W, tk.E))

        self.news_text = tk.Text(self.news_frame, height=5, width=50, wrap="word")
        self.news_text.grid(row=0, column=0, sticky=(tk.W, tk.E))

        # Input Field and Next Button
        self.input_frame = ttk.Frame(self.main_frame, padding="10")
        self.input_frame.grid(row=5, column=0, columnspan=2, pady=10, sticky=(tk.W, tk.E))

        self.rate_label = ttk.Label(self.input_frame, text="Enter New Interest Rate:")
        self.rate_label.grid(row=0, column=0, padx=5, pady=5)

        self.rate_entry = ttk.Entry(self.input_frame, width=20)
        self.rate_entry.grid(row=0, column=1, padx=5, pady=5)

        self.next_button = ttk.Button(self.input_frame, text="Next", command=self.next_turn)
        self.next_button.grid(row=0, column=2, padx=5, pady=5)

        # Bind the Enter key to the next_turn method
        self.root.bind('<Return>', lambda event: self.next_turn())

        # Automatically simulate the first 40 turns
        for _ in range(40):
            self.economy.adjust_interest_rate_with_taylor()
            self.economy.simulate_quarter()

        # Update the UI with initial data
        self.update_ui()

    def create_stats_panel(self):
        # Inflation Rate
        ttk.Label(self.stats_frame, text="Inflation Rate:").grid(row=0, column=0, sticky=tk.W)
        self.inflation_label = ttk.Label(self.stats_frame, text="0.0%")
        self.inflation_label.grid(row=0, column=1, sticky=tk.W)

        # Unemployment Rate
        ttk.Label(self.stats_frame, text="Unemployment Rate:").grid(row=1, column=0, sticky=tk.W)
        self.unemployment_label = ttk.Label(self.stats_frame, text="0.0%")
        self.unemployment_label.grid(row=1, column=1, sticky=tk.W)

        # Interest Rate
        ttk.Label(self.stats_frame, text="Interest Rate:").grid(row=2, column=0, sticky=tk.W)
        self.interest_rate_label = ttk.Label(self.stats_frame, text="0.0%")
        self.interest_rate_label.grid(row=2, column=1, sticky=tk.W)

    def create_graph_panel(self):
        self.fig, self.ax = plt.subplots()
        self.canvas = FigureCanvasTkAgg(self.fig, self.graph_frame)
        self.canvas.draw()
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)

    def update_ui(self):
        state = self.economy.get_state()

        self.inflation_label.config(text=f"{state['inflation_rate']:.2f}%")
        self.unemployment_label.config(text=f"{state['unemployment_rate']:.2f}%")
        self.interest_rate_label.config(text=f"{state['interest_rate']:.2f}%")

        self.quarter_label.config(text=f"Quarter: {self.economy.current_quarter}")

        self.plot_graphs()

    def plot_graphs(self):
        self.ax.clear()
        inflation_history = self.economy.variables.get_history("inflation_rate")
        unemployment_history = self.economy.variables.get_history("unemployment_rate")
        interest_rate_history = self.economy.variables.get_history("interest_rate")

        self.ax.plot(inflation_history, label="Inflation Rate")
        self.ax.plot(unemployment_history, label="Unemployment Rate")
        self.ax.plot(interest_rate_history, label="Interest Rate", linestyle='--')

        self.ax.set_xlabel("Quarter")
        self.ax.set_ylabel("Percentage")
        self.ax.legend()
        self.canvas.draw()

    def next_turn(self):
        try:
            new_rate = float(self.rate_entry.get())
            if not self.economy.adjust_interest_rate(new_rate):
                messagebox.showwarning("Invalid Input", "Please enter a valid interest rate.")
                return
        except ValueError:
            messagebox.showwarning("Invalid Input", "Please enter a valid number for the interest rate.")
            return

        result = self.economy.simulate_quarter()
        if result.get("event"):
            self.news_text.insert(tk.END, f"EVENT: {result['event']}\n")

        self.update_ui()

        # Check for end of game conditions
        if self.economy.current_quarter >= self.current_term_start + self.term_length:
            self.check_end_of_game()

    def check_end_of_game(self):
        final_inflation = self.economy.indicators.inflation_rate
        final_unemployment = self.economy.indicators.unemployment_rate

        if final_inflation < 2 and final_unemployment < 10:
            if self.initial_inflation < 2 and self.initial_unemployment < 10:
                message = "Excellent work! You've maintained a stable economy throughout your term. The nation thrives under your steady leadership."
            elif self.initial_unemployment >= 10:
                message = "From challenges to triumph! You've successfully reduced unemployment and stabilized the economy. Your efforts have truly made a difference."
            elif self.initial_inflation >= 2:
                message = "Inflation tamed! Your strategic decisions have brought stability to the economy. Keep up the great work!"
        elif final_inflation >= 100:
            message = "Inflation has skyrocketed to astronomical levels! Perhaps it's time to consider a career in space exploration instead. 🚀"
        elif final_inflation > 10:
            if final_inflation > self.initial_inflation:
                message = "Inflation has risen significantly during your term. The economy faces challenges ahead. Consider new strategies if you choose to continue."
            else:
                message = "While inflation remains high, you've made progress in controlling it. Keep refining your approach to further improve the economy."
        elif final_unemployment > 10:
            if final_unemployment > self.initial_unemployment:
                message = "Unemployment has increased during your term. Addressing this issue will be crucial for economic recovery."
            else:
                message = "You've made strides in reducing unemployment, but there's still work to be done. Continue your efforts to bring further improvements."
        else:
            message = "Your term has ended with mixed results. The economy has faced both ups and downs. Reflect on your strategies and consider new approaches moving forward."

        self.show_end_game_message(message)

    def show_end_game_message(self, message):
        # Create a new window for the end game message
        end_game_window = tk.Toplevel(self.root)
        end_game_window.title("End of Game")

        # Display the message
        message_label = ttk.Label(end_game_window, text=message, wraplength=400, justify=tk.CENTER, padding=10)
        message_label.pack(pady=20)

        # Buttons for continue or retire
        button_frame = ttk.Frame(end_game_window)
        button_frame.pack(pady=10)

        continue_button = ttk.Button(button_frame, text="Continue Playing", command=lambda: self.on_continue(end_game_window))
        continue_button.pack(side=tk.LEFT, padx=10)

        retire_button = ttk.Button(button_frame, text="Retire", command=end_game_window.destroy)
        retire_button.pack(side=tk.RIGHT, padx=10)

    def on_continue(self, window):
        # Close the end game window
        window.destroy()
        # Start a new term
        self.current_term_start = self.economy.current_quarter + 1
        self.next_button.config(state=tk.NORMAL)

def main():
    root = tk.Tk()
    app = EconomicGameApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
