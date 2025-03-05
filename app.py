from flask import Flask, render_template, jsonify
from random import randint

from rice import riceData

cloudinaryUrl = "https://res.cloudinary.com/dq0joztmo/image/upload/"

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
	return render_template('index.html', title = 'Grain Palette')

@app.route('/upload')
def upload():
	return render_template('upload.html', title = 'Upload Image')

@app.route('/results/<imageId>')
def results(imageId):
	imgUrl = cloudinaryUrl + imageId
	riceTypes = ['ipsala', 'karacadag', 'arborio', 'basmati', 'jasmine']
	rand = randint(0, 4)
	return render_template('results.html', imgurl = imgUrl, title = 'Results', data = riceData[riceTypes[rand]])

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
	app.run(debug=False)