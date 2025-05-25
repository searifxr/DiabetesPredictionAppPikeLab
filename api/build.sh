#!/usr/bin/env bash

echo "Starting build process..."

# Remove previous installations
echo "Removing previous installations..."
pip uninstall -y numpy scikit-learn pandas joblib
rm -rf /usr/local/lib/python*/site-packages/numpy*
rm -rf /usr/local/lib/python*/site-packages/scikit_learn*

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install dependencies
echo "Installing Python packages..."
pip install -r requirements.txt --no-cache-dir

# Install Node dependencies
echo "Installing Node packages..."
npm install

# Verify installations
echo "Verifying installations:"
python -c "import numpy; print('NumPy installation successful')"
python -c "import sklearn; print('Scikit-learn installation successful')"