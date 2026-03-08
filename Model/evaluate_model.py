# evaluate_model.py
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load test dataset
data = pd.read_csv("final_dataset.csv")

# Drop unnecessary columns
data.drop(columns=['Student ID', 'Alternative Career Options', 'Name', 'Preferred Career Paths'], errors='ignore', inplace=True)

# Load preprocessing objects and models
scaler = joblib.load('scaler.pkl')
label_encoders = joblib.load('label_encoders.pkl')
career_encoder = joblib.load('career_encoder.pkl')
decision_tree = joblib.load('decision_tree.pkl')
svm = joblib.load('svm.pkl')
logistic_regression = joblib.load('logistic_regression.pkl')

# Encode input features
for column in data.select_dtypes(include=['object']).columns:
    if column != 'Recommended Career' and column in label_encoders:
        data[column] = label_encoders[column].transform(data[column])

# Encode target
data['Recommended Career Encoded'] = career_encoder.transform(data['Recommended Career'])

# Separate features and target
X = data.drop(columns=['Recommended Career', 'Recommended Career Encoded'])
y_true = data['Recommended Career Encoded']

# Scale features
X_scaled = scaler.transform(X)
feature_columns = X.columns.tolist()

# === Model Pipeline ===

# Stage 1: Decision Tree
broad_predictions = decision_tree.predict(X_scaled)

# Stage 2: SVM
X_svm = pd.DataFrame(X_scaled, columns=feature_columns)
X_svm['Broad Category'] = broad_predictions
svm_features = ['Broad Category', '12th Grade %', 'Stream in 12th', 'Favorite Subject',
                'Top Scored Subject', 'Hobby', 'Problem Solving Skill', 'Analytical Ability']
X_svm = X_svm[svm_features]
refined_predictions = svm.predict(X_svm)

# Stage 3: Logistic Regression
X_logistic = pd.DataFrame(X_scaled, columns=feature_columns)
X_logistic['Broad Category'] = broad_predictions
X_logistic['Refined Career'] = refined_predictions
logistic_features = ['Broad Category', 'Refined Career', '12th Grade %', 'Stream in 12th',
                     'Favorite Subject', 'Top Scored Subject', 'Hobby', 'Problem Solving Skill']
X_logistic = X_logistic[logistic_features]
final_predictions = logistic_regression.predict(X_logistic)

# === Evaluation ===
accuracy = accuracy_score(y_true, final_predictions)
report = classification_report(y_true, final_predictions, target_names=career_encoder.classes_)

print(f"Final Career Prediction Accuracy: {accuracy:.4f}")
print("\nClassification Report:\n", report)
