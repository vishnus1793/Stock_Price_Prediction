from flask import Flask, request, jsonify, send_file
import numpy as np
import pickle
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load your pre-trained model
model = pickle.load(open('model.pkl', 'rb'))

# Serve the index.html from the same directory
@app.route('/')
def index():
    return send_file('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract input data from the request body
        high = float(request.json.get('high', 0))
        low = float(request.json.get('low', 0))
        open_val = float(request.json.get('open', 0))
        volume = float(request.json.get('volume', 0))

        print(f"Received data - High: {high}, Low: {low}, Open: {open_val}, Volume: {volume}")

        # Prepare the input for prediction
        input_query = np.array([[high, low, open_val, volume]])

        # Make the prediction using the model
        result = model.predict(input_query)[0]

        # Return the result as a JSON response
        return jsonify({'res-top': str(result)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
