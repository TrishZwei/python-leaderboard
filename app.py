import os
from flask import Flask, render_template, flash, redirect, url_for, session, logging
from flask import request
import requests
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc

######################################
#### SET UP OUR SQLite DATABASE #####
####################################

# This grabs our directory
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
# Connects our Flask App to our Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
#OMG SO IMPORTANT TO INCLUDE THIS ABOVE! Warnings up the wazoo if not here on a develoment server.

db = SQLAlchemy(app)

#we're adding to table scores
class Score(db.Model):
	__tablename__ = 'scores'
	id = db.Column(db.Integer, primary_key=True) 
	#not planning to delete scores, but still a good practice
	p_name = db.Column(db.String(20), unique=False, nullable=False)
	p_score = db.Column(db.Integer, unique=False, nullable=False) #want score as int so we can sort by it easily.

	def __init__(self, p_name, p_score):
		self.p_name = p_name
		self.p_score = p_score

	def __repr__(self):
		return f"{self.p_name},{self.p_score}"	

#db.create_all(); #to initialize the tables in the db. Do not need after first initilization

@app.route('/')
def index():
	#go to the score table and query it, order it by the score value descending, limit 5 and serve up all of those items I asked for as a list.
	results = Score.query.order_by(desc('p_score')).limit(5).all()
	scores = []
	
	for result in results:
		score_dict = {'name':result.p_name, 'score':result.p_score}
		scores.append(score_dict)

	return render_template('index.html', scores = scores)

@app.route('/game', methods=['GET', 'POST'])
def game():
	
	if request.method == 'POST':
		name = request.form['name']
		score = int(request.form['score'])
		#the code below confirmed I had the proper data. Now to add it to the db.
		#print(name)
		#print(score)

		new_score = Score(name, score)
		db.session.add(new_score)
		db.session.commit()
		
		#here for now, should go to scores eventually.
		return redirect(url_for('scores', username=name))

	return render_template('game.html')

@app.route('/scores', methods=['GET', 'POST'])
@app.route('/scores/<string:username>/', methods=['GET', 'POST'])
def scores(username = ''):
	#does same code as front page. TODO: After you get this to work, refactor this into a function
	results = Score.query.order_by(desc('p_score')).limit(5).all()
	scores = []
	
	for result in results:
		score_dict = {'name':result.p_name, 'score':result.p_score}
		scores.append(score_dict)

	if username != '':
		print(username)
		#spacing in the filter_by argument very important
		nameResults = Score.query.filter_by(p_name=username).order_by(desc('p_score')).limit(5).all()
		nameScores = []

		for nameResult in nameResults:
			name_dict = {'name':nameResult.p_name, 'score':nameResult.p_score}
			nameScores.append(name_dict)

	else:
		print('no username')
		nameScores = []


	return render_template('scores.html', scores=scores, nameScores = nameScores, username = username)


#debug = True so we can send and see messages to the terminal window so we can see what our code is doing!
if __name__ == '__main__':
	 app.run(debug=True)#host and port can be added into parameters
