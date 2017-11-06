from flask import (Flask, Response,
				   render_template, session, request,
				   redirect, url_for, jsonify)
from flask.ext.mongoalchemy import MongoAlchemy
from flask_cors import CORS
#from mongoengine import *
from mongoalchemy.fields import *
import simplejson
from bson import json_util

import bcrypt
from bson.json_util import dumps
import json

app = Flask(__name__)
app.secret_key = 'matcha'

# configure Alchemy
app.config['MONGOALCHEMY_DATABASE'] = 'matcha'
app.config['MONGOALCHEMY_CONNECTION_STRING'] = 'mongodb://oose:letmein@ds015962.mlab.com:15962/matcha'

#connect('matcha', host='mongodb://oose:letmein@ds015962.mlab.com:15962/matcha') # connect MongoEngine

mongo = MongoAlchemy(app)

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


class Student(mongo.Document):

	username = mongo.StringField()
	first_name = mongo.StringField()
	last_name = mongo.StringField()
	email = mongo.StringField()
	linkedin_token = mongo.StringField()
	github_token = mongo.StringField()
	skills = mongo.ListField(mongo.StringField())
	location = mongo.DictField(mongo.StringField(), mongo.StringField()) # dict or tuple of city, state
	need_visa = mongo.StringField()
	looking_for = mongo.ListField(mongo.StringField()) # list
	job_matches = mongo.ListField(mongo.StringField()) # list
	favorited_jobs = mongo.ListField(mongo.StringField()) # list


def student_to_dict(st):

	st_dict = dict()
	st_dict['username'] = st.username
	st_dict['first_name'] = st.first_name
	st_dict['last_name'] = st.last_name
	st_dict['email'] = st.email
	st_dict['linkedin_token'] = st.linkedin_token
	st_dict['github_token'] = st.github_token
	st_dict['skills'] = st.skills  # list of strings
	st_dict['need_visa'] = st.need_visa  # boolean
	st_dict['location'] = st.location  # dict or tuple of city, state
	st_dict['looking_for'] = st.looking_for  # list
	st_dict['job_matches'] = st.job_matches  # list
	st_dict['favorited_jobs'] = st.favorited_jobs  # list

	return st_dict

def dict_to_student(dict):

	st_obj = Student()
	st_obj.username = dict['username']  # each student has a unique username
	st_obj.first_name = dict['first_name']
	st_obj.last_name = dict['last_name']
	st_obj.email = dict['email']
	st_obj.linkedin_token = dict['linkedin_token']
	st_obj.github_token = dict['github_token']
	st_obj.skills = dict['skills']  # list of strings
	st_obj.need_visa = dict['need_visa']  # boolean
	st_obj.location = dict['location']  # dict or tuple of city, state
	st_obj.looking_for = dict['looking_for']  # list
	st_obj.job_matches = dict['job_matches']  # list
	st_obj.favorited_jobs = dict['favorited_jobs']  # list

	return st_obj

@app.route('/v1/createProfile', methods=['POST'])
def create_profile():

	req_data = request.get_json()
	student_obj = dict_to_student(req_data)
	student_obj.save()

	return 'Success'

@app.route('/v1/getProfile/<string:username>', methods=['GET'])
def get_profile(username):

	st_obj = Student.query.filter(Student.username == username).first()

	if st_obj is not None:
		student_dict = student_to_dict(st_obj)
		return dumps(student_dict)
	else:
		return 'Username Not Found' #TODO: improve error handling

@app.route('/v1/editProfile/<string:username>', methods=['POST'])
def edit_profile(username):

	new_data = request.get_json() # dictionary with data from user
	st_obj = Student.query.filter(Student.username == username).first()

	if st_obj is not None:

		for key in new_data:
			setattr(st_obj, key, new_data[key])

		st_obj.save()
		return 'Success'  # TODO: change return value as needed
	else:
		return 'Username Not Found' #TODO: improve error handling


@app.route('/v1/candidate/<string:username>/getCurrentMatches', methods=['GET'])
def get_job_matches(username):

	st_obj = Student.query.filter(Student.username == username).first()

	if st_obj is not None:
		return dumps(st_obj.job_matches)
	else:
		return 'Username Not Found'  # TODO: improve error handling



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

# Listings for testing purposes
# @app.route('/v1/listings/all', methods=['GET'])
# def show_job_listings():
# 	listings = mongo.db.listings.find({})  # all listings
# 	return dumps(listings)
#
#
# @app.route('/v1/listings/new', methods=['POST'])
# def create_job_listing():
# 	# ''' Create a new listing '''
# 	# listings = mongo.db.listings
#     #
# 	# try:
# 	# 	data = json.loads(request.data)
# 	# except AttributeError:
# 	# 	return dumps({'reason': 'malformed data'}), 404
#     #
# 	# new_listing = {'name': data['name'], 'salary': data['salary']}
# 	# listings.insert(new_listing)
#
# 	listings = mongo.db.student.find({})
# 	print(listings)
#
# 	return 'success', 200

if __name__ == '__main__':
	app.run(debug=True)


