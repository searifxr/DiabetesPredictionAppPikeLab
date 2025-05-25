#!/usr/bin/env bash

echo "Starting build process..."

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install dependencies
echo "Installing Python packages..."
pip install -r requirements.txt --no-cache-dir

# Install Node dependencies
echo "Installing Node packages..."
npm install

# Simple verification
echo "Checking installations..."
pip list | grep -E "numpy|scikit-learn|pandas|joblib"