#!/usr/bin/env bash

echo "Starting build process..."

# Clean Python packages
echo "Cleaning existing packages..."
pip uninstall numpy -y
pip uninstall scikit-learn -y

# Install Python dependencies
echo "Installing Python packages..."
python -m pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir

# Install Node dependencies
echo "Installing Node packages..."
npm install

# Verify installations
echo "Verifying installations:"
python -c "import numpy; print(f'NumPy version: {numpy.__version__}')"
python -c "import sklearn; print(f'Scikit-learn version: {sklearn.__version__}')"