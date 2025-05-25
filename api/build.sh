#!/usr/bin/env bash

echo "Starting build process..."

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate

# Upgrade pip and setuptools
echo "Upgrading pip and setuptools..."
python -m pip install --upgrade pip setuptools wheel

# Install dependencies
echo "Installing Python packages..."
pip install --no-cache-dir numpy
pip install -r requirements.txt --no-cache-dir

# Install Node dependencies
echo "Installing Node packages..."
npm install

# Verify installations
echo "Verifying NumPy installation..."
python -c "import numpy; print(f'NumPy version: {numpy.__version__}')"