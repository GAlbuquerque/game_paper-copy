#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Feb 16 13:17:54 2025

@author: gustavo
"""

import tkinter as tk
from tkinter import ttk, messagebox
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.backends.backend_pdf import PdfPages
from economy import Economy
import platform
import os
import ctypes


class EconomicGameApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Economic Simulation Game")
        
        # Force theme reset for consistent styling across platforms
        self.style = ttk.Style()
        self.style.theme_use('default')
        
        # Define colors - CUSTOMIZE THESE VALUES AS NEEDED
        # ------------------------------------------------
        # Main application colors
        self.bg_color = "#FFFFFF"  # Background color (default: white)
        self.text_color = "#000000"  # Text color (default: black)
        self.button_bg_color = "#FFFFFF"  # Button background (default: white)
        self.button_fg_color = "#000000"  # Button text (default: black)
        
        # Graph colors
        self.inflation_color = "red"  # Line color for inflation rate
        self.unemployment_color = "blue"  # Line color for unemployment rate
        self.interest_rate_color = "green"  # Line color for interest rate
        self.term_line_color = "black"  # Vertical line marking term start
        # ------------------------------------------------
        
        # Configure styles with the defined colors
        self.configure_styles()
        
        self.economy = Economy()
        self.initial_inflation = self.economy.indicators.inflation_rate
        self.initial_unemployment = self.economy.indicators.unemployment_rate
        self.current_term_start = 41
        self.term_length = 16

        # Set up the main frame
        self.main_frame = ttk.Frame(root, padding="10", style="Main.TFrame")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Title Label
        self.title_label = ttk.Label(self.main_frame, text="Economic Simulation Game", font=("Helvetica", 30), style="Main.TLabel")
        self.title_label.grid(row=0, column=0, columnspan=3, pady=5)

        # Quarter Label
        self.quarter_label = ttk.Label(self.main_frame, text=f"Quarter: {self.economy.current_quarter}", font=("Helvetica", 16), style="Main.TLabel")
        self.quarter_label.grid(row=1, column=0, columnspan=3, pady=5)

        # Statistics Panel
        self.stats_frame = ttk.LabelFrame(self.main_frame, text="Economic Indicators", padding="10", style="Main.TLabelframe")
        self.stats_frame.grid(row=2, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

        self.create_stats_panel()

        # Graph Panel
        self.graph_frame = ttk.LabelFrame(self.main_frame, text="Economic Graphs", padding="5", style="Main.TLabelframe")
        self.graph_frame.grid(row=4, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

        self.create_graph_panel()

        # News Feed
        self.news_frame = ttk.LabelFrame(self.main_frame, text="News Feed", padding="10", style="Main.TLabelframe")
        self.news_frame.grid(row=5, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

        self.news_text = tk.Text(self.news_frame, font=("Helvetica", 14), height=5, wrap="word", background="white")
        self.news_text.grid(row=0, column=0, columnspan=3, sticky=(tk.W, tk.E))
        
        # Input Field for New Interest Rate (Top Right)
        self.rate_label = ttk.Label(self.main_frame, text="Enter New Interest Rate:", padding="5", font=("Helvetica", 20), style="Main.TLabel")
        self.rate_label.grid(row=6, column=0, sticky=(tk.W, tk.E))

        self.rate_entry = ttk.Entry(self.main_frame, font=("Helvetica", 20))
        self.rate_entry.grid(row=6, column=1, sticky=(tk.W))

        # Next Button (Bottom Right)
        self.next_button = ttk.Button(self.main_frame, text="Next", command=self.next_turn, style="Main.TButton")
        self.next_button.grid(row=6, column=2, sticky=(tk.W, tk.E))

        # Bind the Enter key to the next_turn method
        self.root.bind('<Return>', lambda event: self.next_turn())


       # Copyright
#        self.copyright_label = ttk.Label(self.main_frame, text="© 2025 Gustavo Albuquerque. This game may be shared (with attribution) but not modified or used for commercial purposes without prior authorization.", padding="5", font=("Helvetica", 10),width=40, style="Main.TLabel")
 #       self.copyright_label.grid(row=8, rowspan=3, column=0, sticky=(tk.W, tk.E))
       
        # Automatically simulate the first 40 turns
        for _ in range(40):
            self.economy.adjust_interest_rate_with_taylor()
            result = self.economy.simulate_quarter()
            if result.get("event"):
                #self.show_event_details(result['event'])
                self.news_text.insert(tk.END, f"Quarter {self.economy.current_quarter}: {result['event_name']}\n")

        # Update the UI with initial data
        self.update_ui()

        # Configure all rows and columns to expand equally
        for i in range(8):
            self.root.grid_rowconfigure(i, weight=1)
            self.root.grid_columnconfigure(i, weight=1)
            
        # Schedule the print_window_size method to run after the window is rendered
        self.root.after(100, self.print_window_size)
        
        # Re-apply styles to ensure consistency
        self.configure_styles()
            
    def configure_styles(self):
        """Configure ttk styles with explicit colors for consistent cross-platform appearance"""
        # Configure explicit colors for all elements
        self.style.configure("Main.TFrame", background=self.bg_color)
        self.style.configure("Main.TLabelframe", background=self.bg_color)
        self.style.configure("Main.TLabelframe.Label", background=self.bg_color, foreground=self.text_color)
        self.style.configure("Main.TLabel", background=self.bg_color, foreground=self.text_color)
        self.style.configure("Main.TButton", background=self.button_bg_color, foreground=self.button_fg_color)
        
        # Map styles to states for more consistent behavior
        self.style.map("Main.TFrame", background=[('active', self.bg_color), ('!active', self.bg_color)])
        self.style.map("Main.TLabelframe", background=[('active', self.bg_color), ('!active', self.bg_color)])
        self.style.map("Main.TLabel", background=[('active', self.bg_color), ('!active', self.bg_color)])
        
        # Button state colors - slightly darker when pressed
        darker_button = self.adjust_color_brightness(self.button_bg_color, -20)
        lighter_button = self.adjust_color_brightness(self.button_bg_color, 10)
        
        self.style.map("Main.TButton", 
                  foreground=[('pressed', self.button_fg_color), ('active', self.button_fg_color)],
                  background=[('pressed', darker_button), ('active', lighter_button)])
    
    def adjust_color_brightness(self, hex_color, brightness_offset):
        """Adjust the brightness of a hex color"""
        # Convert hex to RGB
        hex_color = hex_color.lstrip('#')
        r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        
        # Adjust brightness
        r = max(0, min(255, r + brightness_offset))
        g = max(0, min(255, g + brightness_offset))
        b = max(0, min(255, b + brightness_offset))
        
        # Convert back to hex
        return f"#{r:02x}{g:02x}{b:02x}"
            
    def print_window_size(self):
        # Get the current window size
        width = self.root.winfo_width()
        height = self.root.winfo_height()
        print(f"Current window size: {width}x{height}")

        # Check if the window fits a small screen
        if width < 800 or height < 600:
            print("The window may fit well on a small screen.")
        else:
            print("The window may not fit well on the screen.")

    def create_stats_panel(self):
        # Inflation Rate
        ttk.Label(self.stats_frame, text="Inflation Rate:", style="Main.TLabel").grid(row=0, column=0, sticky=(tk.W, tk.E))
        self.inflation_label = ttk.Label(self.stats_frame, text="0.0%", style="Main.TLabel")
        self.inflation_label.grid(row=0, column=1, sticky=tk.W)

        # Unemployment Rate
        ttk.Label(self.stats_frame, text="Unemployment Rate:", style="Main.TLabel").grid(row=1, column=0, sticky=(tk.W, tk.E))
        self.unemployment_label = ttk.Label(self.stats_frame, text="0.0%", style="Main.TLabel")
        self.unemployment_label.grid(row=1, column=1, sticky=tk.W)

        # Interest Rate
        ttk.Label(self.stats_frame, text="Interest Rate:", style="Main.TLabel").grid(row=2, column=0, sticky=(tk.W, tk.E))
        self.interest_rate_label = ttk.Label(self.stats_frame, text="0.0%", style="Main.TLabel")
        self.interest_rate_label.grid(row=2, column=1, sticky=tk.W)

    def create_graph_panel(self):
        # Create a figure without a fixed size
        self.fig, self.ax = plt.subplots(figsize=(6, 4), dpi=80)
        self.fig.set_dpi(80)  # Set DPI to 100
        self.fig.set_facecolor(self.bg_color)  # Set figure background to match app
        self.ax.set_facecolor('white')  # White background for better chart readability

        self.canvas = FigureCanvasTkAgg(self.fig, self.graph_frame)
        self.canvas.draw()
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)
        # Ensure the graph_frame expands with the window
        self.graph_frame.grid_rowconfigure(0, weight=1)
        self.graph_frame.grid_columnconfigure(0, weight=1)

    def update_ui(self):
        state = self.economy.get_state()

        self.inflation_label.config(text=f"{state['inflation_rate']:.2f}%")
        self.unemployment_label.config(text=f"{state['unemployment_rate']:.2f}%")
        self.interest_rate_label.config(text=f"{state['interest_rate']:.2f}%")

        self.quarter_label.config(text=f"Quarter: {self.economy.current_quarter}")

        self.plot_graphs()

    def plot_graphs(self):
        self.ax.clear()
        self.ax.set_facecolor('white')  # White background for better chart readability
        
        inflation_history = self.economy.variables.get_history("inflation_rate")
        unemployment_history = self.economy.variables.get_history("unemployment_rate")
        interest_rate_history = self.economy.variables.get_history("interest_rate")
        natural_unemployment_history = self.economy.variables.get_history("natural_unemployment_rate")

        self.ax.plot(inflation_history, label="Inflation Rate", color=self.inflation_color)
        self.ax.plot(unemployment_history, label="Unemployment Rate", color=self.unemployment_color)
        self.ax.plot(interest_rate_history, label="Interest Rate", linestyle='--', color=self.interest_rate_color)

        # Add a dashed vertical line for the start of the player's term
        if self.current_term_start <= len(inflation_history):
            self.ax.axvline(x=40, color=self.term_line_color, linestyle='--')

        self.ax.set_xlabel("Quarter")
        self.ax.set_ylabel("Percentage")
        self.ax.legend(fontsize=8)
        self.canvas.draw()

    def next_turn(self):
        try:
            new_rate = float(self.rate_entry.get())
    
            # Check for negative interest rate
            if new_rate < 0:
                messagebox.showwarning("Invalid Input", "Interest rate cannot be negative.")
                return
    
            # Check for excessive increase in interest rate
            current_rate = self.economy.interest_rate
            current_inflation = self.economy.indicators.inflation_rate
            if new_rate > current_rate * 9 and new_rate > current_inflation + 10:
                messagebox.showwarning("Invalid Input", "You are not allowed to raise the interest rate that much!")
                return
    
            # Adjust the interest rate
            self.economy.adjust_interest_rate(new_rate)
        
        except ValueError:
            messagebox.showwarning("Invalid Input", "Please enter a valid number for the interest rate.")
            return

        result = self.economy.simulate_quarter()
        if result.get("event"):
            self.show_event_details(result['event'])
            self.news_text.insert(tk.END, f"Quarter {self.economy.current_quarter}: {result['event_name']}\n")

        self.update_ui()

        # Check for end of game conditions
        if self.economy.current_quarter >= self.current_term_start + self.term_length:
            self.check_end_of_game()

    def check_end_of_game(self):
        final_inflation = self.economy.indicators.inflation_rate
        final_unemployment = self.economy.indicators.unemployment_rate

        if final_inflation < 2 and final_unemployment < 7:
            if self.initial_inflation < 2 and self.initial_unemployment < 7:
                message = "Excellent work! You've maintained a stable economy throughout your term. The nation thrives under your steady leadership."
            elif self.initial_unemployment >= 15:
                message = "From challenges to triumph! You've successfully reduced unemployment and stabilized the economy. Your efforts have truly made a difference."
            elif self.initial_inflation >= 3:
                message = "Inflation tamed! Your strategic decisions have brought stability to the economy. Keep up the great work!"
        elif final_inflation >= 100:
            message = "Inflation has skyrocketed to astronomical levels! Perhaps it's time to consider a career in space exploration instead. 🚀"
        elif final_inflation > 10:
            if final_inflation > self.initial_inflation+2:
                message = "Inflation has risen significantly during your term. The economy faces challenges ahead. Consider new strategies if you choose to continue."
            elif final_inflation < self.initial_inflation:
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
        
        # Apply consistent styling
        end_game_frame = ttk.Frame(end_game_window, style="Main.TFrame", padding=10)
        end_game_frame.pack(fill=tk.BOTH, expand=True)

        # Display the message
        message_label = ttk.Label(end_game_frame, text=message, wraplength=600, justify=tk.CENTER, 
                                 padding=20, style="Main.TLabel")
        message_label.pack(pady=20)

        # Buttons for continue or retire
        button_frame = ttk.Frame(end_game_frame, style="Main.TFrame")
        button_frame.pack(pady=20)

        continue_button = ttk.Button(button_frame, text="Continue Playing", 
                                    command=lambda: self.on_continue(end_game_window),
                                    style="Main.TButton")
        continue_button.pack(side=tk.LEFT, padx=20)

        retire_button = ttk.Button(button_frame, text="Retire", 
                                  command=lambda: self.on_retire(end_game_window),
                                  style="Main.TButton")
        retire_button.pack(side=tk.RIGHT, padx=20)

    def on_continue(self, window):
        # Close the end game window
        window.destroy()
        # Start a new term
        self.current_term_start = self.economy.current_quarter + 1
        self.next_button.config(state=tk.NORMAL)

    def on_retire(self, window):
        # Close the game window
        self.root.destroy()

    def show_event_details(self, event):
        # Create a new window for event details
        event_window = tk.Toplevel(self.root)
        event_window.title("Event Details")
        
        # Apply consistent styling
        event_frame = ttk.Frame(event_window, style="Main.TFrame", padding=10)
        event_frame.pack(fill=tk.BOTH, expand=True)

        # Display the event details
        event_text = tk.Text(event_frame, font=("Helvetica", 25), height=2, wrap="word", background="white")
        event_text.insert(tk.END, event)
        event_text.config(state=tk.DISABLED)  # Make the text box read-only
        event_text.pack(padx=5, pady=5, fill=tk.BOTH, expand=True)

        # OK button to close the window
        ok_button = ttk.Button(event_frame, text="OK", command=event_window.destroy, style="Main.TButton")
        ok_button.pack(pady=5)


def main():
    root = tk.Tk()
    try:
        ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
    except Exception:
        pass
    app = EconomicGameApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()