from flask import Flask, render_template, flash, redirect, url_for, session, logging
from flask import request
import requests
import sqlite3

app = Flask(__name__)

app.debug=True

@app.route('/')
def index():
	#connect(s)
	conn = sqlite3.connect('gamesite.db')
	#create a cursor
	cur = conn.cursor()
	cur.execute("SELECT name, score from scores ORDER BY score DESC")
	scores = cur.fetchmany(5);
	#do the execute
	conn.commit()
	#close the connection
	conn.close()

	return render_template('index.html', scores=scores)

@app.route('/game', methods=['GET', 'POST'])
def game():
	if request.method == 'POST':
		name = request.form['name']
		score = int(request.form['score'])
		# print(name)
		# print(score)
		#connect(s)
		conn = sqlite3.connect('gamesite.db')
		#create a cursor
		cur = conn.cursor()
		cur.execute("INSERT INTO scores(name,score) VALUES (?,?)", (name, score))
			#do the execute
		conn.commit()
		#close the connection
		conn.close()
#		return render_template('scores.html', scores=scores, nameScores = nameScores, username = name)
		return redirect(url_for('scores', username=name))

	return render_template('game.html')

@app.route('/scores', methods=['GET', 'POST'])
@app.route('/scores/<string:username>/', methods=['GET', 'POST'])
def scores(username = ''):
	#connect(s)
	conn = sqlite3.connect('gamesite.db')

	#create a cursor
	cur = conn.cursor()
	cur.execute("SELECT name, score from scores ORDER BY score DESC")
	scores = cur.fetchmany(5);
	if username != '':
		print(username)
		cur.execute("SELECT name, score from scores WHERE name = (?) ORDER BY score DESC", (username,))
		#the comma after username is needed... no idea why.
		nameScores = cur.fetchmany(5);
	else:
		nameScores = []

	#do the execute
	conn.commit()
	#close the connection
	conn.close()

	return render_template('scores.html', scores=scores, nameScores = nameScores, username = username)



if __name__ == '__main__':
	 app.run(); #host and port can be added into parameters

