from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.vgg16 import preprocess_input
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde el frontend

# Cargar el modelo entrenado
model = load_model('../modelo/modelo_final.h5')

# Diccionario de clases
CLASES = ['adenocarcinoma', 'large_cell_carcinoma', 'squamous_carcinoma', 'normal']

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    img = Image.open(file).convert("RGB").resize((224, 224))
    img_array = preprocess_input(np.expand_dims(np.array(img), axis=0))

    prediction = model.predict(img_array)
    predicted_class = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    return jsonify({
        'class': CLASES[predicted_class],
        'confidence': round(confidence, 4)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
