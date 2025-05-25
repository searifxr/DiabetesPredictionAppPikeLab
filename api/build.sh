#!/usr/bin/env bash

# Load environment variables
set -a
source .env
set +a

# Setup Python
echo "Setting up Python ${PYTHON_VERSION}..."
python -m pip install --upgrade pip
pip install -r requirements.txt

# Setup Node.js
echo "Setting up Node.js ${NODE_VERSION}..."
npm install

# Verify installations
echo "Python version:"
python --version
echo "Node version:"
node --version
echo "NPM version:"
npm --version