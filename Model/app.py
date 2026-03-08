from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the models and preprocessing objects
decision_tree = joblib.load('decision_tree.pkl')
svm = joblib.load('svm.pkl')
logistic_regression = joblib.load('logistic_regression.pkl')
scaler = joblib.load('scaler.pkl')
label_encoders = joblib.load('label_encoders.pkl')
career_encoder = joblib.load('career_encoder.pkl')

# Define feature columns (based on the dataset)
feature_columns = [
    "Age", "Gender", "10th Grade %", "12th Grade %", "School Board", "Stream in 12th",
    "Favorite Subject", "Favorite Subject Marks", "Top Scored Subject", "Top Subject Marks",
    "Hobby", "Problem Solving Skill", "Communication Skill", "Leadership Skill",
    "Creative Thinking", "Analytical Ability", "Social Behavior", "Long Term Goal"
]

# Function to recommend a career based on user input
def recommend_career(user_input):
    try:
        # Create a DataFrame from the input data
        user_df = pd.DataFrame([user_input])

        # Encode categorical variables
        for column in user_df.select_dtypes(include=['object']).columns:
            if column in label_encoders:
                try:
                    user_df[column] = label_encoders[column].transform(user_df[column])
                except ValueError as e:
                    print(f"Error encoding column '{column}': {e}")
                    print(f"Allowed values for '{column}': {list(label_encoders[column].classes_)}")
                    return None

        # Ensure feature consistency (handle missing columns)
        missing_cols = set(feature_columns) - set(user_df.columns)
        for col in missing_cols:
            print(f"Missing column: {col}. Assigning default value (0).")
            user_df[col] = 0  # Assign default values

        # Reorder columns to match the training order
        user_df = user_df[feature_columns]

        # Scale user input
        user_df_scaled = scaler.transform(user_df)

        # Predict broad category using Decision Tree
        broad_category = decision_tree.predict(user_df_scaled)[0]
        print(f"Predicted Broad Category (encoded): {broad_category}")

        # Prepare input for SVM
        user_df_svm = pd.DataFrame(user_df_scaled, columns=feature_columns)
        user_df_svm['Broad Category'] = broad_category

        target_features_svm = ['Broad Category', '12th Grade %', 'Stream in 12th', 'Favorite Subject',
                               'Top Scored Subject', 'Hobby', 'Problem Solving Skill', 'Analytical Ability']
        user_df_svm = user_df_svm[target_features_svm]

        # Predict refined career using SVM
        refined_career = svm.predict(user_df_svm)[0]
        print(f"Predicted Refined Career (encoded): {refined_career}")

        # Prepare input for Logistic Regression
        user_df_logistic = user_df_svm.copy()
        user_df_logistic['Refined Career'] = refined_career

        target_features_logistic = ['Broad Category', 'Refined Career', '12th Grade %', 'Stream in 12th',
                                    'Favorite Subject', 'Top Scored Subject', 'Hobby', 'Problem Solving Skill']
        user_df_logistic = user_df_logistic[target_features_logistic]

        # Predict final career category (numeric) using Logistic Regression
        final_career_encoded = logistic_regression.predict(user_df_logistic)[0]

        # Decode the predicted career into its original label
        final_career = career_encoder.inverse_transform([final_career_encoded])[0]
        print(f"Final Recommended Career: {final_career}")

        return final_career

    except Exception as e:
        print(f"Error in recommend_career: {e}")
        return None

# API endpoint to handle prediction requests
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract JSON data from the request
        user_input = request.json

        # Validate input
        if not user_input:
            return jsonify({'error': 'No input data provided'}), 400

        # Call the recommendation function
        recommended_career = recommend_career(user_input)

        if recommended_career:
            # Return the prediction as a JSON response
            return jsonify({'career': recommended_career})
        else:
            return jsonify({'error': 'Error processing input'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
