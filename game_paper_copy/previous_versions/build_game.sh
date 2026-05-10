#!/bin/bash

echo "======================================="
echo "    🧩 Building Paper Game for macOS"
echo "======================================="

# Go to the script's directory
cd "$(dirname "$0")"

# Make sure pip and pyinstaller are available
python3 -m ensurepip --default-pip

if ! python3 -m pip show pyinstaller >/dev/null 2>&1; then
  echo "📦 Installing PyInstaller..."
  python3 -m pip install pyinstaller
fi

# Build the app
echo "🚀 Building the game..."
pyinstaller --windowed --onedir --name "PIRS" \
  --icon=icon.ico \
  --add-data "icon.ico:." \
  --hidden-import matplotlib.backends.backend_tkagg \
  main_gui3.py


echo ""
echo "✅ Build complete! Check the 'dist' folder."