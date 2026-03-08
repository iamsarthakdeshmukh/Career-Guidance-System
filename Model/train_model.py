import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib

# Step 1: Load and preprocess the dataset
def preprocess_data(filepath):
    # Load the dataset
    df = pd.read_csv(filepath)

    # Drop unnecessary columns
    df = df.drop(columns=['Student ID', 'Alternative Career Options', 'Name', 'Preferred Career Paths'], errors='ignore')

    # Encode categorical variables
    label_encoders = {}
    for column in df.select_dtypes(include=['object']).columns:
        if column != 'Recommended Career':  # Exclude target variable
            le = LabelEncoder()
            df[column] = le.fit_transform(df[column])
            label_encoders[column] = le

    # Encode the target variable separately
    career_encoder = LabelEncoder()
    df['Recommended Career'] = career_encoder.fit_transform(df['Recommended Career'])

    # Define features and target
    X = df.drop(columns=['Recommended Career'])
    y = df['Recommended Career']

    # Scale the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y, scaler, label_encoders, career_encoder, X.columns.tolist()

# Step 2: Train the models
def train_models(X_train, X_test, y_train, y_test, feature_columns):
    # Step 2.1: Decision Tree Classifier (Broad Classification)
    decision_tree = DecisionTreeClassifier(max_depth=10, min_samples_split=5, random_state=42)
    decision_tree.fit(X_train, y_train)

    # Step 2.2: Support Vector Machine (SVM)
    broad_predictions = decision_tree.predict(X_test)

    # Convert X_test to a DataFrame and add the 'Broad Category' column
    # Ensure X_test remains scaled
    X_svm = pd.DataFrame(X_test, columns=feature_columns)  # Use scaled X_test here
    X_svm['Broad Category'] = broad_predictions

    # Select features for SVM
    target_features_svm = ['Broad Category', '12th Grade %', 'Stream in 12th', 'Favorite Subject',
                            'Top Scored Subject', 'Hobby', 'Problem Solving Skill', 'Analytical Ability']
    X_svm = X_svm[target_features_svm]
    y_svm = y_test

    svm = SVC(random_state=42, class_weight='balanced')
    svm.fit(X_svm, y_svm)

    # Step 2.3: Logistic Regression
    refined_predictions = svm.predict(X_svm)

    # Convert X_test to a DataFrame and add the 'Broad Category' and 'Refined Career' columns
    # Ensure X_test remains scaled
    X_logistic = pd.DataFrame(X_test, columns=feature_columns)  # Use scaled X_test here
    X_logistic['Broad Category'] = broad_predictions
    X_logistic['Refined Career'] = refined_predictions

    # Select features for Logistic Regression
    target_features_logistic = ['Broad Category', 'Refined Career', '12th Grade %', 'Stream in 12th',
                                 'Favorite Subject', 'Top Scored Subject', 'Hobby', 'Problem Solving Skill']
    X_logistic = X_logistic[target_features_logistic]
    y_logistic = y_test

    logistic_regression = LogisticRegression(
        random_state=42, max_iter=5000, solver='saga', penalty='l2', class_weight='balanced'
    )
    logistic_regression.fit(X_logistic, y_logistic)

    return decision_tree, svm, logistic_regression

# Step 3: Save the models and preprocessing objects
def save_models(decision_tree, svm, logistic_regression, scaler, label_encoders, career_encoder):
    # Save the trained models
    joblib.dump(decision_tree, 'decision_tree.pkl')
    joblib.dump(svm, 'svm.pkl')
    joblib.dump(logistic_regression, 'logistic_regression.pkl')

    # Save the scaler and encoders
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(label_encoders, 'label_encoders.pkl')
    joblib.dump(career_encoder, 'career_encoder.pkl')

# Main function to execute the pipeline
if __name__ == "__main__":
    # filepath = 'student_career_dataset_new.csv'
    filepath = 'final_dataset.csv'

    # Preprocess the data
    X_scaled, y, scaler, label_encoders, career_encoder, feature_columns = preprocess_data(filepath)

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42, stratify=y
    )

    # Train the models
    decision_tree, svm, logistic_regression = train_models(X_train, X_test, y_train, y_test, feature_columns)

    # Save the models and preprocessing objects
    save_models(decision_tree, svm, logistic_regression, scaler, label_encoders, career_encoder)

    print("Models and preprocessing objects saved successfully!")