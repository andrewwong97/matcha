from flask import (Flask, Response,
                   render_template, session, request,
                   redirect, url_for, jsonify)
from flask_pymongo import PyMongo

import bcrypt
from bson.json_util import dumps
import random

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'matcha'
app.config['MONGO_URI'] = 'mongodb://oose:letmein@ds015962.mlab.com:15962/matcha'
# UNSAFE, CHANGE IN PRODUCTION

mongo = PyMongo(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


# Basic Register
@app.route('/v1/login', methods=['POST'])
def login():
    if request.method == 'POST':
        u = mongo.db.users.find_one({'email': request.form['email']})

        if u is None:
            session['email'] = None
            return redirect(url_for('index'))
        else:
            session['email'] = request.form['email']


# Basic Register
@app.route('/v1/register', methods=['GET', 'POST'])
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


# Listings for testing purposes

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

@app.route('/v1/createProfile') # shell for creating profiles
def create_profile():
	profiles = mongo.db.profiles # create new profiles collection
	profiles.insert({'username': 'Matcha'}) # TODO: Add code to create profiles and necessary fields
	return 'Success'

@app.route('/v1/getProfile/<string:username>', methods=['GET'])
def get_profile(username):
    profiles = mongo.db.profiles.find({'username': username})  # get document with given username
	# TODO: Add code to work with profile
    return dumps(profiles) # TODO: change return value as needed

@app.route('/v1/editProfile/<string:username>', methods=['POST'])
def edit_profile(username):
    profiles = mongo.db.profiles.find({'username': username})  # get document with given username
	# TODO: Add code to update necessary profile fields
    return dumps(profiles) # TODO: change return value as needed

@app.route('/v1/candidate/<string:candidate>/getCurrentMatches', methods=['GET'])
def get_job_matches(candidate):
    jobmatches = mongo.db.jobmatches.find({'candidate': candidate}, {'matches': 1, '_id': 0}) # return only job matches
	# TODO: Add any additional code
    return dumps(jobmatches) # TODO: change return value as needed




if __name__ == '__main__':
    app.run(debug=True)
