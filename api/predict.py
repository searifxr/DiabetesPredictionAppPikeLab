import sys
import json
import numpy as np
from joblib import load

try:
    # Read input from stdin
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    
    # Load model and scaler
    model = load('diabetes_model.pkl')
    scaler = load('scaler.pkl')
    
    # Prepare input data
    features = np.array([
        data['Pregnancies'],
        data['Glucose'],
        data['BloodPressure'],
        data['SkinThickness'],
        data['Insulin'],
        data['BMI'],
        data['DiabetesPedigreeFunction'],
        data['Age']
    ])
    
    # Scale features
    features_scaled = scaler.transform(features.reshape(1, -1))
    
    # Make prediction
    prediction = int(model.predict(features_scaled)[0])
    probability = float(model.predict_proba(features_scaled)[0][1])
    
    # Return JSON response
    result = {
        "prediction": prediction,
        "probability": probability
    }
    
    print(json.dumps(result))

except Exception as e:
    error_response = {
        "error": str(e)
    }
    print(json.dumps(error_response))