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
        self.economy = Economy()
        self.initial_inflation = self.economy.indicators.inflation_rate
        self.initial_unemployment = self.economy.indicators.unemployment_rate
        self.current_term_start = 41
        self.term_length = 16
        
        # Get screen width and height
        #screen_width = self.root.winfo_screenwidth()
        #screen_height = self.root.winfo_screenheight()
        
        #print(screen_width, screen_height)

        # Set window size based on screen resolution
        #window_width = int(screen_width * 0.8)
        #window_height = int(screen_height * 0.8)
        #print(f"{window_width}x{window_height}")
        #self.root.geometry(f"{window_width}x{window_height}")
        #root.geometry('800x600') 


        # Set up the main frame with a green background
        self.main_frame = ttk.Frame(root,  padding="10", style="Green.TFrame")
        
        #self.main_frame = ttk.Frame(root, width = window_width, height = window_height, padding="10", style="Green.TFrame")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Title Label
        self.title_label = ttk.Label(self.main_frame, text="Economic Simulation Game", font=("Helvetica", 30), style="Green.TLabel")
        self.title_label.grid(row=0, column=0, columnspan=3, pady=5)

        # Quarter Label
        self.quarter_label = ttk.Label(self.main_frame, text=f"Quarter: {self.economy.current_quarter}", font=("Helvetica", 16), style="Green.TLabel")
        self.quarter_label.grid(row=1, column=0, columnspan=3, pady=5)

        # Statistics Panel
        self.stats_frame = ttk.LabelFrame(self.main_frame, text="Economic Indicators", padding="10", style="Green.TLabelframe")
        self.stats_frame.grid(row=2, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

        self.create_stats_panel()

        # Graph Panel
        self.graph_frame = ttk.LabelFrame(self.main_frame, text="Economic Graphs", padding="5", style="Green.TLabelframe")
        self.graph_frame.grid(row=4, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

        self.create_graph_panel()

        # News Feed
        self.news_frame = ttk.LabelFrame(self.main_frame, text="News Feed", padding="10", style="Green.TLabelframe")
        self.news_frame.grid(row=5, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

        self.news_text = tk.Text(self.news_frame, font=("Helvetica", 14), height= 5,  wrap="word", background="white")
        self.news_text.grid(row=0, column=0, columnspan=3, sticky=(tk.W, tk.E))
        

        # Input Field for New Interest Rate (Top Right)
        self.rate_label = ttk.Label(self.main_frame, text="Enter New Interest Rate:", padding="5", font=("Helvetica", 20), style="Info.TLabel")
        self.rate_label.grid(row=6, column=0, sticky=(tk.W, tk.E))

        self.rate_entry = ttk.Entry(self.main_frame, font=("Helvetica", 20), style="TEntry")
        self.rate_entry.grid(row=6, column=1, sticky=(tk.W, tk.E))

        # Next Button (Bottom Right)
        self.next_button = ttk.Button(self.main_frame, text="Next",
                                      command=self.next_turn)
        self.next_button.grid(row=7, column=2, sticky=(tk.W, tk.E))

        # Bind the Enter key to the next_turn method
        self.root.bind('<Return>', lambda event: self.next_turn())



        # Automatically simulate the first 40 turns
        for _ in range(40):
            self.economy.adjust_interest_rate_with_taylor()
            result = self.economy.simulate_quarter()
            if result.get("event"):
                self.show_event_details(result['event'])
                self.news_text.insert(tk.END, f"Quarter {self.economy.current_quarter}: {result['event_name']}\n")

        # Update the UI with initial data
        self.update_ui()

        # Full-screen mode
      #  self.root.attributes('-fullscreen', True)

        # Configure styles for green background
        style = ttk.Style()
        style.configure("Green.TFrame", background="lightgreen")
        style.configure("Green.TLabelframe", background="lightgreen")
        style.configure("Green.TLabel", background="lightgreen", foreground="black")
        style.configure("Green.TButton", background="darkgreen", foreground="white")
        style.configure("TEntry", font=("Helvetica", 20))

        # Configure all rows and columns to expand equally
        for i in range(7):  # Assuming you have 3 rows and 3 columns
            self.root.grid_rowconfigure(i, weight=1)
            self.root.grid_columnconfigure(i, weight=1)
            
        #window size        
        # Schedule the print_window_size method to run after the window is rendered
        self.root.after(100, self.print_window_size)
            
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
        ttk.Label(self.stats_frame, text="Inflation Rate:", style="Green.TLabel").grid(row=0, column=0, sticky=(tk.W, tk.E))
        self.inflation_label = ttk.Label(self.stats_frame, text="0.0%", style="Green.TLabel")
        self.inflation_label.grid(row=0, column=1, sticky=tk.W)

        # Unemployment Rate
        ttk.Label(self.stats_frame, text="Unemployment Rate:", style="Green.TLabel").grid(row=1, column=0, sticky=(tk.W, tk.E))
        self.unemployment_label = ttk.Label(self.stats_frame, text="0.0%", style="Green.TLabel")
        self.unemployment_label.grid(row=1, column=1, sticky=tk.W)

        # Interest Rate
        ttk.Label(self.stats_frame, text="Interest Rate:", style="Green.TLabel").grid(row=2, column=0, sticky=(tk.W, tk.E))
        self.interest_rate_label = ttk.Label(self.stats_frame, text="0.0%", style="Green.TLabel")
        self.interest_rate_label.grid(row=2, column=1, sticky=tk.W)

    def create_graph_panel(self):
        # Create a figure without a fixed size
        #self.fig, self.ax = plt.subplots()
        self.fig, self.ax = plt.subplots(figsize=(6, 4), dpi=80)
        self.fig.set_dpi(80)  # Set DPI to 100


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
        inflation_history = self.economy.variables.get_history("inflation_rate")
        unemployment_history = self.economy.variables.get_history("unemployment_rate")
        interest_rate_history = self.economy.variables.get_history("interest_rate")
        natural_unemployment_history = self.economy.variables.get_history("natural_unemployment_rate")


        self.ax.plot(inflation_history, label="Inflation Rate", color="red")
        self.ax.plot(unemployment_history, label="Unemployment Rate", color="blue")
        self.ax.plot(interest_rate_history, label="Interest Rate", linestyle='--', color="green")
      #  self.ax.plot(natural_unemployment_history, label="NU", color="black")


        # Add a dashed vertical line for the start of the player's term
        if self.current_term_start <= len(inflation_history):
            self.ax.axvline(x=40, color='black', linestyle='--')

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
            if new_rate > current_rate * 9 and new_rate > 2:
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

        if final_inflation < 2 and final_unemployment < 10:
            if self.initial_inflation < 2 and self.initial_unemployment < 10:
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

        # Display the message
        message_label = ttk.Label(end_game_window, text=message, wraplength=600, justify=tk.CENTER, padding=20)
        message_label.pack(pady=20)

        # Buttons for continue or retire
        button_frame = ttk.Frame(end_game_window)
        button_frame.pack(pady=20)

        continue_button = ttk.Button(button_frame, text="Continue Playing", command=lambda: self.on_continue(end_game_window))
        continue_button.pack(side=tk.LEFT, padx=20)

        retire_button = ttk.Button(button_frame, text="Retire", command=lambda: self.on_retire(end_game_window))
        retire_button.pack(side=tk.RIGHT, padx=20)

    def on_continue(self, window):
        # Close the end game window
        window.destroy()
        # Start a new term
        self.current_term_start = self.economy.current_quarter + 1
        self.next_button.config(state=tk.NORMAL)

    def on_retire(self, window):
        # Export the graph to a PDF
        #pdf_pages = PdfPages("economic_graph.pdf")
        #self.fig.savefig(pdf_pages, format='pdf')
        #pdf_pages.close()

        # Open the PDF file based on the operating system
        #if platform.system() == "Windows":
         #   os.system("start economic_graph.pdf")
        #elif platform.system() == "Darwin":  # macOS
         #   os.system("open economic_graph.pdf")
        #elif platform.system() == "Linux":
         #   os.system("xdg-open economic_graph.pdf")

        # Close the game window
        self.root.destroy()

    def show_event_details(self, event):
        # Create a new window for event details
        event_window = tk.Toplevel(self.root)
        event_window.title("Event Details")

        # Display the event details
        event_text = tk.Text(event_window, font=("Helvetica", 25), height= 2, wrap="word", background="white")
        event_text.insert(tk.END, event)
        event_text.config(state=tk.DISABLED)  # Make the text box read-only
        event_text.pack(padx=5, pady=5)

        # OK button to close the window
        ok_button = ttk.Button(event_window, text="OK", command=event_window.destroy)
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
