import joblib

# Define your feature columns (Ensure these match your training data)
feature_columns = ['Broad Category', '12th Grade %', 'Stream in 12th', 'Favorite Subject',
                   'Favorite Subject Marks', 'Top Scored Subject', 'Top Subject Marks',
                   'Career Interest', 'Age', 'Problem Solving Skill']

# Save feature columns to a file
joblib.dump(feature_columns, 'feature_columns.pkl')

print("feature_columns.pkl saved successfully!")
