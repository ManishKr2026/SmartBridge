from flask import Flask, render_template, jsonify
import requests
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

model = load_model("mobilenetv2_model.h5")

from rice import riceData

cloudinaryUrl = "https://res.cloudinary.com/dq0joztmo/image/upload/"

rice_labels = ["arborio", "basmati", "ipsala", "jasmine", "karacadag"]

app = Flask(__name__, static_folder='static')

def predict_image(imgUrl):
    
    response = requests.get(imgUrl)
    image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    image = cv2.resize(image, (224, 224))

    image = np.array(image, dtype=np.float32)
    image = preprocess_input(image)

    image = np.expand_dims(image, axis=0)

    predictions = model.predict(image)

    predicted_class = np.argmax(predictions, axis=1)[0]

    predicted_label = rice_labels[predicted_class]

    return predicted_label


@app.route('/')
def home():
	return render_template('index.html', title = 'Grain Palette')

@app.route('/upload')
def upload():
	return render_template('upload.html', title = 'Upload Image')

@app.route('/results/<imageId>')
def results(imageId):
	imgUrl = cloudinaryUrl + imageId

	predicted_label = predict_image(imgUrl)

	return render_template('results.html', imgurl = imgUrl, title = 'Results', data = riceData[predicted_label])

@app.route('/team')
def team():
	return render_template('team.html', title = 'Our Team')

@app.route('/about')
def about():
	return render_template('about.html', title = 'About')

@app.route('/ping')
def ping():
	return jsonify({'response': 'pong'})

if(__name__ == '__main__'):
	app.run(debug=True)