from flask import (Flask, Response,
				   render_template, session, request,
				   redirect, url_for, jsonify)
from flask_pymongo import PyMongo
from flask_cors import CORS

import bcrypt
from bson.json_util import dumps
import json
import random

app = Flask(__name__)
app.secret_key = 'matcha'

app.config['MONGO_DBNAME'] = 'matcha'
app.config['MONGO_URI'] = 'mongodb://oose:letmein@ds015962.mlab.com:15962/matcha'

mongo = PyMongo(app)

# For specific cors, uncomment
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
	return render_template('index.html')


# Basic Login
@app.route('/login', methods=['POST'])
def login():
	if request.method == 'POST':
		data = json.loads(request.data)

		# u = mongo.db.users.find_one({'email': request.form['email']})
		u = mongo.db.users.find_one({'email': data['email']})

		if u is None:
			session['email'] = None
			return dumps({'status': 404, 'reason': 'invalid email'}), 404
		else:
			session['email'] = data['email']
			return dumps({'email': data['email'], 'first_name': u['first_name'], 'last_name': u['last_name']}), 200

	return redirect(url_for('index'))


# Basic Logout
@app.route('/logout', methods=['POST'])
def logout():
	session.pop('email', None)
	return redirect(url_for('index'))


# Basic Register
@app.route('/register', methods=['GET', 'POST'])
def register():
	if request.method == 'POST':
		users = mongo.db.users
		data = json.loads(request.data)

		f_name = data['first_name']
		l_name = data['last_name']
		email = data['email']
		pwd = data['password'].encode('utf8')

		u = users.find_one({'email': email})
		if u is None:  # no user exists for this email
			hashpass = bcrypt.hashpw(pwd, bcrypt.gensalt())
			new_user = {'first_name': f_name, 'last_name': l_name, 'email': email, 'password': hashpass}
			users.insert(new_user)
			session['email'] = data['email']
			return dumps(new_user), 200

		return dumps({'reason': 'Email is already being used for another account'}), 200

	return render_template('/index.html')


# Listings for testing purposes

@app.route('/v1/listings/all', methods=['GET'])
def show_job_listings():
	listings = mongo.db.listings.find({})  # all listings
	return dumps(listings)


@app.route('/v1/listings/new', methods=['POST'])
def create_job_listing():
	''' Create a new listing '''
	listings = mongo.db.listings

	try:
		data = json.loads(request.data)
	except AttributeError:
		return dumps({'reason': 'malformed data'}), 404

	new_listing = {'name': data['name'], 'salary': data['salary']}
	listings.insert(new_listing)

	return dumps(new_listing), 200


@app.route('/v1/createProfile')
def create_profile():
	''' Create a new profile '''
	profiles = mongo.db.profiles # create new profiles collection
	profiles.insert({'username': 'Matcha'}) # TODO: Add code to create profiles and necessary fields
	return 'Success'

@app.route('/v1/getProfile/<string:username>', methods=['GET'])
def get_profile(username):
	''' Get a profile with the given username '''
	profiles = mongo.db.profiles.find({'username': username}) 
	# TODO: Add code to work with profile
	return dumps(profiles) # TODO: change return value as needed

@app.route('/v1/editProfile/<string:username>', methods=['POST'])
def edit_profile(username):
	profiles = mongo.db.profiles.find({'username': username})  # get document with given username
	# TODO: Add code to update necessary profile fields
	return 'Success' # TODO: change return value as needed

@app.route('/v1/candidate/<string:username>/getCurrentMatches', methods=['GET'])
def get_job_matches(username):
	job_matches = mongo.db.profiles.find({'username': username}, {'matches': 1, '_id': 0}) # return only job matches
	# TODO: Add any additional code
	return dumps(job_matches) # TODO: change return value as needed

@app.route('/v1/candidate/<string:username>/declineJob/<string:job_name>', methods=['POST'])
def decline_job(username, job_name):
	# TODO: search employer job listing to remove candidate from matches
	return 'Success'

@app.route('/v1/candidate/<string:username>/favoriteJob/<string:job_name>', methods=['POST'])
def favorite_job(username, job_name):
	# TODO: add code to favorite job
	return 'Success'

@app.route('/v1/candidate/<string:username>/createReminder', methods=['POST'])
def create_reminder(username):
	# TODO: add code to create a reminder
	return 'Success'

@app.route('/v1/candidate/<string:username>/deleteReminder/<string:reminder>', methods=['DELETE'])
def delete_reminder(username, reminder):
	# TODO: add code to delete reminder
	return 'Success'

@app.route('/v1/employer/<string:employer>/getAuthorization', methods=['GET'])
def get_authorization(employer):
	employers = mongo.db.employers.find({'employer': employer}) # get list of employers
	# TODO: Add any additional code
	return dumps(employers) # TODO: change return value as needed

@app.route('/v1/employer/<string:employer>/getCurrentJobs', methods=['GET'])
def get_current_jobs(employer):
	job_listings = mongo.db.employers.find({'employer': employer}, {'jobs_listings': 1, '_id': 0}) # return only job matches
	# TODO: Add any additional code
	return dumps(job_listings) # TODO: change return value as needed

# @app.route('/v1/employer/<string:employer>/getCurrentJobs', methods=['GET'])
# def get_current_jobs(employer):
# 	job_listings = mongo.db.employers.find({'employer': employer}, {'jobs_listings': 1, '_id': 0}) # return only job matches
# 	# TODO: Add any additional code
# 	return dumps(job_listings) # TODO: change return value as needed

@app.route('/v1/employer/<string:employer>/declineCandidate/<string:candidate>/<string:job_name>', methods=['POST'])
def decline_candidate(employer, job_name, candidate):
	# TODO: search employer job listing to remove candidate from matches
	return 'Success'

@app.route('/v1/employer/<string:employer>/favoriteCandidate/<string:candidate>/<string:job_name>', methods=['POST'])
def favorite_candidate(employer, job_name, candidate):
	# TODO: search employer job listing to favorite candidate
	return 'Success'

@app.route('/v1/employer/<string:employer>/newJob', methods=['POST'])
def new_job(employer):
	# TODO: create new job
	return 'Success'

@app.route('/v1/employer/<string:employer>/editJob/<string:job_name>', methods=['POST'])
def edit_job(employer):
	# TODO: edit job
	return 'Success'

@app.route('/v1/employer/<string:employer>/deleteJob/<string:job_name>', methods=['DELETE'])
def delete_job(employer):
	# TODO: delete job
	return 'Success'

@app.route('/v1/admin/authorizeEmployer/<string:employer>', methods=['POST'])
def authorize_employer(employer):
	# TODO: authorize employer
	return 'Success'

@app.route('/v1/admin/deauthorizeEmployer/<string:employer>', methods=['POST'])
def deauthorize_employer(employer):
	# TODO: deauthorize employer
	return 'Success'

@app.route('/v1/admin/hideAccount/<string:employer>', methods=['POST'])
def hide_account(employer):
	# TODO: hide account
	return 'Success'

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)
