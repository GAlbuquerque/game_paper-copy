@echo off
title 🧩 Build PIRS

echo =======================================
echo     Building the PIRS Game
echo =======================================



cd /d "%~dp0"

echo Building the game...
pyinstaller --windowed --onedir --name "PIRS_windows" ^
  --icon=icon.ico ^
  --add-data "icon.ico;." ^
  --hidden-import matplotlib.backends.backend_tkagg ^
  main_gui3.py

echo.
echo ✅ Build complete! Check the "dist" folder.
pause