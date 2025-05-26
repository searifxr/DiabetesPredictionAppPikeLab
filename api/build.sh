#!/usr/bin/env bash

echo "Starting build process..."

# Install Python dependencies
echo "Installing Python packages..."
python -m pip install --upgrade pip wheel setuptools
pip install numpy==1.24.3 --no-cache-dir
pip install -r requirements.txt --no-cache-dir

# Install Node dependencies
echo "Installing Node packages..."
npm install

# Verify Python installation
echo "Verifying Python packages..."
python -c "import numpy; print('NumPy:', numpy.__version__)"