import sys
import json
import numpy as np
import pandas as pd
import joblib

def predict():
    try:
        # Load the input data
        input_data = json.loads(sys.argv[1])
        
        # Create DataFrame with feature names matching training data
        features_df = pd.DataFrame([{
            'Pregnancies': input_data['Pregnancies'],
            'Glucose': input_data['Glucose'],
            'BloodPressure': input_data['BloodPressure'],
            'SkinThickness': input_data['SkinThickness'],
            'Insulin': input_data['Insulin'],
            'BMI': input_data['BMI'],
            'DiabetesPedigreeFunction': input_data['DiabetesPedigreeFunction'],
            'Age': input_data['Age']
        }])

        # Load model and scaler
        model = joblib.load('diabetes_model.pkl')
        scaler = joblib.load('scaler.pkl')
        
        # Scale the features
        features_scaled = scaler.transform(features_df)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0][1]
        
        # Generate feedback
        feedback = []
        if input_data['Glucose'] > 140:
            feedback.append("High blood glucose level detected")
        if input_data['BMI'] > 25:
            feedback.append("BMI indicates overweight")
        if input_data['BloodPressure'] > 130:
            feedback.append("Elevated blood pressure")
        
        # Return result
        result = {
            'prediction': int(prediction),
            'probability': float(probability),
            'feedback': feedback
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({'error': str(e)}))

if __name__ == '__main__':
    predict()