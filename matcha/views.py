import json
from bson.json_util import dumps
from flask import (render_template, session, request,redirect, url_for)
from models import Student, Employer, listings
from app import app, mongo
from util import student_to_dict, dict_to_student, employer_to_dict, dict_to_employer
from util import linkedin_redirect_uri, linkedin_token, linkedin_basic_profile, li_to_student, linkedin_to_skills_list
from util import listing_to_dict, dict_to_listing
from util import matcher


# catch-all for front end
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


@app.route('/v1/getLinkedinURI', methods=['GET'])
def get_linkedin_uri():
    """
    Return Linkedin redirect URI.
    :return: { uri: <redirect_uri> }
    """
    return dumps({'uri': linkedin_redirect_uri()}), 200


@app.route('/v1/login', methods=['POST'])
def login():
    """
    Login with username and password. Returns a JSON serialized
    Student object.
    :return: { first_name: <first_name>, last_name ...  }
    """
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        # v dangerous, plaintext password

        # check if username is in db
        st_obj = Student.query.filter(Student.username == username, Student.password == password).first()

        if st_obj is not None:
            student_dict = student_to_dict(st_obj)
            if 'password' in student_dict:
                del student_dict['password']
            print student_dict
            return dumps(student_dict), 200
        else:
            return dumps({"reason": "No account exists for this username"}), 404


@app.route('/v1/linkedinLogin', methods=['POST'])
def linkedin_login():
    """
    Login with auth code. Exchanges auth code for auth token. Finds student with
    corresponding linkedin_token and returns serialized Student.
    :return: { linkedin_token: <token>, profile: <serialized_student> }
    """
    req = request.get_json()
    try:
        token = linkedin_token(req['code'])['access_token']
    except KeyError:
        # no access token
        print 'error: {}'.format(linkedin_token(req['code']))
        return dumps({'reason': linkedin_token(req['code'])['error_description']}), 404

    stu = Student.query.filter(Student.linkedin_token == token).first()
    if stu:
        return dumps({'linkedin_token': token, 'profile': student_to_dict(stu)}), 200
    else:
        # student doesn't exist, create it
        profile_dict = linkedin_basic_profile(token)
        new_student = li_to_student(profile_dict)
        new_student.linkedin_token = token
        new_student.skills = linkedin_to_skills_list(profile_dict)
        new_student.save()
        stu = Student.query.filter(Student.linkedin_token == token).first()
        print 'student created: \n {}'.format(student_to_dict(stu))
        return dumps({'linkedin_token': token, 'profile': student_to_dict(stu)}), 200


@app.route('/v1/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index')), 200


@app.route('/v1/createStudentProfile', methods=['POST'])
def create_student_profile():
    # TODO: search for existing account
    # if exist, return dumps({'reason': 'Student account already exists for email'}), 404
    req_data = request.get_json()
    student_obj = dict_to_student(req_data)
    student_obj.save()

    return dumps(student_to_dict(student_obj)), 200


@app.route('/v1/getStudentProfile/<string:username>', methods=['GET'])
def get_student_profile(username):
    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj is not None:
        student_dict = student_to_dict(st_obj)
        return dumps(student_dict), 200
    else:
        return dumps({}), 404


@app.route('/v1/editStudentProfile/<string:username>', methods=['POST'])
def edit_student_profile(username):
    new_data = request.get_json()  # dictionary with data from user
    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj is not None:

        for key in new_data:
            setattr(st_obj, key, new_data[key])

        st_obj.save()
        return dumps({student_to_dict(st_obj)}), 200
    else:
        return dumps({}), 404


@app.route('/v1/createEmployerProfile', methods=['POST'])
def create_employer_profile():
    req_data = request.get_json()
    employer_obj = dict_to_employer(req_data)
    employer_obj.save()

    return dumps(employer_to_dict(employer_obj)), 200


@app.route('/v1/getEmployerProfile/<string:company_name>', methods=['GET'])
def get_employer_profile(company_name):
    em_obj = Employer.query.filter(Employer.company_name == company_name).first() # TODO: fix so not case sensitive

    if em_obj is not None:
        em_dict = employer_to_dict(em_obj)
        return dumps(em_dict)
    else:
        return 'Username Not Found'  # TODO: improve error handling


@app.route('/v1/editEmployerProfile/<string:company_name>', methods=['POST'])
def edit_employer_profile(company_name):
    new_data = request.get_json()  # dictionary with data from user
    em_obj = Employer.query.filter(Employer.company_name == company_name).first()

    if em_obj is not None:

        for key in new_data:
            setattr(em_obj, key, new_data[key])

        em_obj.save()
        return 'Success'  # TODO: change return value as needed
    else:
        return 'Username Not Found'  # TODO: improve error handling


@app.route('/v1/candidate/<string:username>/getMatches', methods=['GET'])
def get_matches(username):
    st_obj = Student.query.filter(Student.username == username).first()
    if st_obj is not None:
        matches = []
        matches_dict = {}
        for listing_obj in listings.query.all():
            rating = matcher(st_obj, listing_obj)
            if rating > 0:
                if str(rating) not in matches_dict:
                    matches_dict = {str(rating): [listing_to_dict(listing_obj)]}
                else:
                    matches_dict[str(rating)].append(listing_to_dict(listing_obj))
        for key in matches_dict:
            matches += matches_dict[key]
        return dumps(matches), 200
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
    employers = mongo.db.employers.find({'employer': employer})  # get list of employers
    # TODO: Add any additional code
    return dumps(employers)  # TODO: change return value as needed


@app.route('/v1/employer/<string:employer>/getCurrentJobs', methods=['GET'])
def get_current_jobs(employer):
    job_listings = mongo.db.employers.find({'employer': employer},
                                           {'jobs_listings': 1, '_id': 0})  # return only job matches
    # TODO: Add any additional code
    return dumps(job_listings)  # TODO: change return value as needed


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

@app.route('/v1/employer/<string:employer>/getJobMatches/<string:job_name>', methods=['DELETE'])
def get_job_matches(employer, job_name):
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


@app.route('/v1/listings/all', methods=['GET'])
def get_all_listings():
    from pymongo import MongoClient
    client = MongoClient('mongodb://oose:letmein@ds015962.mlab.com:15962/matcha')
    db = client['matcha']
    return dumps(db.listings.find()), 200


@app.route('/v1/skills/all', methods=['GET'])
def get_all_skills():
    all_skills = []
    for listing in listings.query.all():
        all_skills += listing.desired_skills
    return dumps(sorted(set(all_skills))), 200



