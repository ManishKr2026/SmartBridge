from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('index.html', title = 'Grain Palette')

@app.route('/upload')
def upload():
	return render_template('upload.html', title = 'Upload Image')

@app.route('/results')
def results():
	return render_template('results.html', title = 'Results')

@app.route('/team')
def team():
	return render_template('team.html', title = 'Our Team')

@app.route('/about')
def about():
	return render_template('about.html', title = 'About')

if(__name__ == '__main__'):
	app.run(debug=True)