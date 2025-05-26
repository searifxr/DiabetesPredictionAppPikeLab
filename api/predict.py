import sys
import json
import numpy as np
from joblib import load

try:
    # Read from stdin instead of argv
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    
    # Load model and scaler from same directory
    model = load('diabetes_model.pkl')
    scaler = load('scaler.pkl')
    
    # Convert to numpy array directly
    features = np.array([
        float(data['Pregnancies']),
        float(data['Glucose']),
        float(data['BloodPressure']), 
        float(data['SkinThickness']),
        float(data['Insulin']),
        float(data['BMI']),
        float(data['DiabetesPedigreeFunction']),
        float(data['Age'])
    ]).reshape(1, -1)
    
    # Scale and predict
    features_scaled = scaler.transform(features)
    prediction = int(model.predict(features_scaled)[0])
    probability = float(model.predict_proba(features_scaled)[0][1])
    
    # Return result
    print(json.dumps({
        'prediction': prediction,
        'probability': probability
    }))

except Exception as e:
    print(json.dumps({'error': str(e)}))
    sys.exit(1)