from flask import Flask, render_template, session, request, redirect, url_for
from flask_pymongo import PyMongo

import bcrypt
from bson.json_util import dumps
import random

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'matcha'
app.config['MONGO_URI'] = 'mongodb://oose:letmein@ds015962.mlab.com:15962/matcha'
# UNSAFE, CHANGE IN PRODUCTION

mongo = PyMongo(app)

@app.route('/')
def index():
	if 'email' in session:  # user email identifier
		return 'You are logged in as {}'.format(session['email'])

	return render_template('index.html')


# Basic Login
@app.route('/login')
def login():
	return ''


# Basic Register
@app.route('/register', methods=['GET', 'POST'])
def register():
	if request.method == 'POST':
		users = mongo.db.users
		u = users.find_one({'email': request.form['email']})

		if u is None:  # no user exists for this email
			hashpass = bcrypt.hashpw(request.form['password'].encode('utf8'), bcrypt.gensalt())
			users.insert({'email': request.form['email'], 'password': hashpass})
			session['email'] = request.form['email']
			return redirect(url_for('index'))

		return 'Email is already being used for another account'

	return render_template('/index.html')



@app.route('/v1/listings/all', methods=['GET'])
def show_job_listings():
	listings = mongo.db.listings.find({})  # all listings
	
	return dumps(listings)

@app.route('/v1/listings/new')
def create_job_listing():
    listings = mongo.db.listings  # collection
    salary = random.randint(5000, 10000)
    listings.insert({'name': 'Software Engineering Intern', 'salary': salary})
    return 'Success!'


if __name__ == '__main__':
  app.run(debug=True)

