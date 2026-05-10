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
from datetime import datetime
from economy import Economy
import platform
import os
import ctypes
from pathlib import Path



offset = 10  # hidden turns

class EconomicGameApp:

    def bootstrap_initial_history(self):
        
        # Reset model/state
        self.economy = Economy()
        self.end_game_window = None
        self.current_term_start = 41  + offset
        self.news_text.delete("1.0", tk.END)
        self.economy.offset = offset        
        # Announce which persona was chosen (for testing)
        #self.news_text.insert(tk.END, f"Initial central banker persona: {self.economy.cb_persona}\n")

    
        # Autorun first 40 quarters (same as init)
        for _ in range(40 + offset):
            self.economy.adjust_interest_rate_with_taylor()
            result = self.economy.simulate_quarter()
            if result.get("event") and self.economy.current_quarter>offset:
                self.news_text.insert(tk.END, f"Quarter {max(1, self.economy.current_quarter - offset)}: {result['event_name']}\n")
                self.rate_entry.delete(0, tk.END)   

        # Sync UI
        self.rate_entry.delete(0, tk.END)
        self.rate_entry.insert(0, f"{self.economy.interest_rate:.2f}")
        self.update_ui()
        self.plot_graphs()           
            
    def __init__(self, root):
        self.root = root
        self.root.title("Policy Interest Rate Simulator")
        
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
        self.title_label = ttk.Label(self.main_frame, text="Policy Interest Rate Simulator", font=("Helvetica", 30), style="Main.TLabel")
        self.title_label.grid(row=0, column=0, columnspan=3, pady=5)

        # Quarter Label
        self.quarter_label = ttk.Label(self.main_frame, text=f"Quarter: {max(1, self.economy.current_quarter - offset)}", font=("Helvetica", 16), style="Main.TLabel")
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

        # News Feed with scrollbar
        self.news_text = tk.Text(
            self.news_frame,
            font=("Helvetica", 14),
            height=5,
            wrap="word",
            background="white"
        )
        scrollbar = tk.Scrollbar(self.news_frame, orient="vertical", command=self.news_text.yview)
        self.news_text.configure(yscrollcommand=scrollbar.set)
        self.news_text.tag_config("detail", foreground="firebrick", font=("Helvetica", 12, "italic"))

        self.latest_event_label = tk.Label(
            self.news_frame,
            text="",
            font=("Helvetica", 16, "bold"),
            fg="red",
            bg=self.news_text.cget("background"),  # match the text widget’s white
            justify="left",
            wraplength=600,
            anchor="w",
            padx=10,
            pady=5
        )
        self.latest_event_label.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(5,0))
        
        # Layout
        self.news_text.grid(row=0, column=0, sticky=(tk.N, tk.S, tk.W, tk.E))
        scrollbar.grid(row=0, column=1, sticky=(tk.N, tk.S))
        
        # Frame expansion
        self.news_frame.rowconfigure(0, weight=1)
        self.news_frame.columnconfigure(0, weight=1)
        
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
        self.bootstrap_initial_history()


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
        self.current_event_name = None
        self.fig.set_dpi(80)  # Set DPI to 100
        self.fig.set_facecolor(self.bg_color)  # Set figure background to match app
        self.ax.set_facecolor('white')  # White background for better chart readability
        
        self.current_event_name = None

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

        self.quarter_label.config(text=f"Quarter: {max(1, self.economy.current_quarter - offset)}")

        self.plot_graphs()

    def plot_graphs(self):
        self.ax.clear()
        self.ax.set_facecolor('white')
    
        inflation_history = self.economy.variables.get_history("inflation_rate")[offset:]
        unemployment_history = self.economy.variables.get_history("unemployment_rate")[offset:]
        interest_rate_history = self.economy.variables.get_history("interest_rate")[offset:]
        natural_unemployment_history = self.economy.variables.get_history("natural_unemployment_rate")[offset:]
        rep_history = self.economy.variables.get_history("cb_reputation")[offset:]

    
        self.ax.plot(inflation_history, label="Inflation Rate", color=self.inflation_color)
        self.ax.plot(unemployment_history, label="Unemployment Rate", color=self.unemployment_color)
        self.ax.plot(interest_rate_history, label="Interest Rate", linestyle='--', color=self.interest_rate_color)
        # optional: also show NU if desired
        #self.ax.plot(natural_unemployment_history, label="NU", linestyle='--')
        #self.ax.plot(rep_history, label="Reputation", linestyle='--')

    
        if self.current_term_start <= len(inflation_history) + offset:
            self.ax.axvline(x=40, color=self.term_line_color, linestyle='--')
    
        self.ax.set_xlabel("Quarter")
        self.ax.set_ylabel("Percentage")
        self.ax.legend(fontsize=8)
    
        # ✅ Grid
        self.ax.minorticks_on()
        self.ax.grid(True, which='major', linewidth=0.8, alpha=0.4)
        self.ax.grid(True, which='minor', linewidth=0.5, alpha=0.2)
    
        self.fig.tight_layout()
        
        # Event banner (only for this frame)
        # Event banner (inside the plot area for attention)
        if getattr(self, "current_event_name", None):
            self.ax.text(
                0.5, 0.92,  # << was 1.02, move down into the graph
                self.current_event_name,
                transform=self.ax.transAxes,
                ha='center', va='top',
                color='red', fontsize=16, fontweight='bold',
                bbox=dict(facecolor='white', alpha=0.7, edgecolor='none', boxstyle='round,pad=0.3')
            )
    
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

            if (new_rate > current_rate * 9
                and new_rate > current_inflation + 10):
                answer = messagebox.askyesno(
                    "Confirm High Rate",
                    f"You are setting the interest rate to {new_rate:.2f}.%\n"
                    "This is a very large increase. Are you sure?"
                )
                if not answer:
                    # revert entry to the old rate and stop
                    self.rate_entry.delete(0, tk.END)
                    self.rate_entry.insert(0, f"{self.economy.interest_rate:.2f}")
                    return
                
            # Adjust the interest rate
            self.economy.adjust_interest_rate(new_rate)
        
        except ValueError:
            messagebox.showwarning("Invalid Input", "Please enter a valid number for the interest rate.")
            return
    
        result = self.economy.simulate_quarter()
        
        #Getting the news
        if result.get("event"):
            # Permanent headline to news feed
            self.news_text.insert(
                tk.END,
                f"Quarter {max(1, self.economy.current_quarter - offset)}: {result['event_name']}\n"
            )
            self.news_text.see(tk.END)
        
            # Show detail in separate label (overwrites old)
            self.latest_event_label.config(
                text=f"{result['event_name']}\n    • {result['event']}"
            )
        
            self.current_event_name = result['event_name']
            #self.rate_entry.delete(0, tk.END)
        else:
            # Clear detail if no event
            self.latest_event_label.config(text="")
            self.current_event_name = None


        self.update_ui()
        # Show only for this redraw; clear for next turn
        self.current_event_name = None

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
        # Prevent multiple popups
        if self.end_game_window and self.end_game_window.winfo_exists():
            return  
    
        self.end_game_window = tk.Toplevel(self.root)
        self.end_game_window.title("End of Game")
    
        end_game_frame = ttk.Frame(self.end_game_window, style="Main.TFrame", padding=10)
        end_game_frame.pack(fill=tk.BOTH, expand=True)
    
        message_label = ttk.Label(
            end_game_frame, text=message, wraplength=600,
            justify=tk.CENTER, padding=20, style="Main.TLabel"
        )
        message_label.pack(pady=20)
    
        button_frame = ttk.Frame(end_game_frame, style="Main.TFrame")
        button_frame.pack(pady=20)
    
        continue_button = ttk.Button(
            button_frame, text="Continue Playing",
            command=lambda: self.on_continue(self.end_game_window),
            style="Main.TButton"
        )
        continue_button.pack(side=tk.LEFT, padx=20)
    
        retire_button = ttk.Button(
            button_frame, text="Retire",
            command=lambda: self.on_retire(self.end_game_window),
            style="Main.TButton"
        )
        retire_button.pack(side=tk.RIGHT, padx=20)

    def on_continue(self, window):
        # Close the end game window
        window.destroy()
        # Start a new term
        self.current_term_start = self.economy.current_quarter + 1
        self.next_button.config(state=tk.NORMAL)

    def on_retire(self, window):
        window.destroy()  # close popup, keep app
    
        # Freeze inputs
        self.next_button.config(state=tk.DISABLED)
        self.rate_entry.config(state=tk.DISABLED)
    
        # Banner
        self.end_label = ttk.Label(self.main_frame, text="Game Over — You Retired",
                                   font=("Helvetica", 20), style="Main.TLabel")
        self.end_label.grid(row=7, column=0, columnspan=3, pady=15)
    
        # Actions
        self.new_game_button = ttk.Button(self.main_frame, text="New Game", command=self.new_game)
        self.new_game_button.grid(row=8, column=1, sticky=(tk.W, tk.E), padx=4)
    
        self.save_graph_button = ttk.Button(self.main_frame, text="Save Chart", command=self.save_chart)
        self.save_graph_button.grid(row=8, column=2, sticky=(tk.W, tk.E), padx=4)

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

    def new_game(self):
        # Re-enable UI and remove end widgets
        self.next_button.config(state=tk.NORMAL)
        self.rate_entry.config(state=tk.NORMAL)
        if hasattr(self, "end_label"): self.end_label.destroy()
        if hasattr(self, "new_game_button"): self.new_game_button.destroy()
        if hasattr(self, "save_graph_button"): self.save_graph_button.destroy()
        # Re-bootstrap just like init
        self.bootstrap_initial_history()

    def save_chart(self):
        # Save charts under ~/EconGame/charts
        charts_dir = Path.home() / "EconGame" / "charts"
        charts_dir.mkdir(parents=True, exist_ok=True)
    
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        png_path = charts_dir / f"economy_{ts}.png"
        pdf_path = charts_dir / f"economy_{ts}.pdf"
    
        self.fig.savefig(png_path, dpi=200, bbox_inches="tight")
        with PdfPages(pdf_path) as pdf:
            pdf.savefig(self.fig, bbox_inches="tight")
    
        messagebox.showinfo("Saved", f"Chart saved:\n{png_path}")
        


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