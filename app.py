from flask import Flask, render_template, flash, redirect, url_for, session, logging
from flask import request
import requests

app = Flask(__name__)

app.debug=True

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/game', methods=['GET', 'POST'])
def game():
	if request.method == 'POST':
		return redirect(url_for('index'))

	return render_template('game.html')

@app.route('/scores', methods=['GET', 'POST'])
def scores():
	if request.method == 'POST':
		return redirect(url_for('index'))

	return render_template('scores.html')



if __name__ == '__main__':
	 app.run(); #host and port can be added into parameters

