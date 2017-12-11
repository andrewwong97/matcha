from bson.json_util import dumps
from flask import (render_template, session, request,redirect, url_for)
from models import Student, Employer, Listing
from app import app, mongo
from util import student_to_dict, dict_to_student, employer_to_dict, dict_to_employer, li_to_student
from util import listing_to_dict, dict_to_listing
from util import student_listing_matcher
from linkedin import linkedin_redirect_uri, linkedin_token, linkedin_basic_profile, linkedin_to_skills_list


# catch-all for front end
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

# LOGIN/LOGOUT ENDPOINTS


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
    Student or Employer object.
    :return: { first_name: <first_name> ... account_type: <Student or Employer>  }
    """
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']

        # check if username is in db
        st_obj = Student.query.filter(Student.username == username, Student.password == password).first()

        if st_obj is None:
            em_obj = Employer.query.filter(Employer.username == username, Employer.password == password).first()
            if em_obj:
                employer_dict = employer_to_dict(em_obj)
                if 'password' in employer_dict:
                    del employer_dict['password']
                print employer_dict
                employer_dict['account_type'] = 'Employer'
                return dumps(employer_dict), 200
            else:
                return dumps({"reason": "No account exists for this username"}), 404
        else:
            student_dict = student_to_dict(st_obj)
            if 'password' in student_dict:
                del student_dict['password']
            print student_dict
            student_dict['account_type'] = 'Student'
            return dumps(student_dict), 200


@app.route('/v1/linkedinLogin', methods=['POST'])
def linkedin_login():
    """
    Login with auth code and exchanges auth code for auth token.
    If the auth token is expired, update the Student object.

    Finds student with
    corresponding linkedin_token and returns serialized Student.
    :return: { linkedin_token: <token>, profile: <serialized_student> }
    """
    req = request.get_json()
    try:
        token = linkedin_token(req['code'])['access_token']  # get new token
        # TODO: perhaps use token expiration date for fail-safe log in
    except KeyError:
        # no access token
        print 'error: {}'.format(linkedin_token(req['code']))
        return dumps({'reason': linkedin_token(req['code'])['error_description'], 'uri': linkedin_redirect_uri()}), 404

    stu = Student.query.filter(Student.linkedin_token == token).first()
    if stu:
        # if token is not expired/invalid, return student
        profile = student_to_dict(stu)
        profile['account_type'] = 'Student'
        print 'student found: \n {}'.format(profile)
        return dumps({'linkedin_token': token, 'profile': profile}), 200
    else:
        # update token, return student
        profile_dict = linkedin_basic_profile(token)

        account_exists = Student.query.filter(Student.username == profile_dict['emailAddress']).first()
        if account_exists:
            account_exists.linkedin_token = token  # update token
            profile = student_to_dict(account_exists)
            profile['account_type'] = 'Student'
            print 'student found: \n {}'.format(profile)
            return dumps({'linkedin_token': token, 'profile': profile}), 200
        else:
            # if linkedin_token doesn't exist in db, create student
            new_student = li_to_student(profile_dict)
            new_student.linkedin_token = token
            new_student.skills = linkedin_to_skills_list(profile_dict)
            new_student.save()
            stu = Student.query.filter(Student.linkedin_token == token).first()

            profile = student_to_dict(stu)
            profile['account_type'] = 'Student'
            print 'student created: \n {}'.format(profile)
            return dumps({'linkedin_token': token, 'profile': profile}), 200


@app.route('/v1/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index')), 200

# STUDENT ENDPOINTS


@app.route('/v1/createStudentProfile', methods=['POST'])
def create_student_profile():
    req_data = request.get_json()

    if 'skills' in req_data:
        skills = [i.lower() for i in req_data['skills']]
        req_data['skills'] = skills

    student_obj = dict_to_student(req_data)

    account_exists = Student.query.filter(Student.username == req_data['username']).first()
    if account_exists:
        return dumps({'reason': 'Student account already exists for email'}), 404

    employer_exists = Employer.query.filter(Employer.username == req_data['username']).first()
    if employer_exists:
        return dumps({'reason': 'Employer account already exists for email'}), 404
    else:
        student_obj.save()
        st_dict = student_to_dict(student_obj)
        st_dict['account_type'] = 'Student'
        return dumps(st_dict), 200


@app.route('/v1/getStudentProfile/<string:username>', methods=['GET'])
def get_student_profile(username):
    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj is not None:
        student_dict = student_to_dict(st_obj)
        student_dict['account_type'] = 'Student'
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
        return dumps(student_to_dict(st_obj)), 200
    else:
        return dumps({'reason': 'Student account does not exist'}), 404

# EMPLOYER ENDPOINTS


@app.route('/v1/createEmployerProfile', methods=['POST'])
def create_employer_profile():
    req_data = request.get_json()

    account_exists = Employer.query.filter(Employer.username == req_data['email']).first()
    if account_exists:
        return dumps({'reason': 'Employer account already exists for email'}), 404

    student_exists = Student.query.filter(Student.username == req_data['email']).first()
    if student_exists:
        return dumps({'reason': 'Student account already exists for email'}), 404

    employer_obj = dict_to_employer(req_data)
    employer_obj.save()
    em_dict = employer_to_dict(employer_obj)
    return dumps(em_dict), 200


@app.route('/v1/getEmployerProfile/<string:company_name>', methods=['GET'])
def get_employer_profile(company_name):
    em_obj = Employer.query.filter(Employer.company_name == company_name).first()  # TODO: fix so not case sensitive

    if em_obj is not None:
        em_dict = employer_to_dict(em_obj)
        return dumps(em_dict), 200
    else:
        return dumps({}), 404


@app.route('/v1/editEmployerProfile/<string:username>', methods=['POST'])
def edit_employer_profile(username):
    new_data = request.get_json()  # dictionary with data from user
    em_obj = Employer.query.filter(Employer.username == username).first()

    if em_obj:

        for key in new_data:
            setattr(em_obj, key, new_data[key])

        em_obj.save()
        return dumps(employer_to_dict(em_obj)), 200
    else:
        return dumps({}), 404

# ADD/DELETE/SHOW JOBS ENDPOINTS


@app.route('/v1/employer/<string:employer>/getCurrentJobs', methods=['GET'])
def get_current_jobs(employer):
    jobs = []
    for l in Listing.query.all():
        if l.employer == employer:
            listing_dict = listing_to_dict(l)
            listing_dict['_id'] = l.mongo_id
            jobs.append(listing_dict)
    return dumps(jobs), 200


@app.route('/v1/employer/<string:employer>/newJob', methods=['POST'])
def new_job(employer):
    req_data = request.get_json()
    listing_obj = dict_to_listing(req_data)
    listing_obj.employer = employer
    listing_obj.save()

    return dumps(listing_to_dict(listing_obj)), 200


@app.route('/v1/employer/<string:employer>/editJob/<string:job_id>', methods=['POST'])
def edit_job(employer, job_id):
    new_data = request.get_json()  # dictionary with data from user
    ls_obj = Listing.query.filter(Listing.mongo_id == job_id).first()

    if ls_obj is not None:

        for key in new_data:
            setattr(ls_obj, key, new_data[key])

        ls_obj.save()
        return 'Success'  # TODO: change return value as needed
    else:
        return 'Username Not Found'  # TODO: improve error handling


# START MATCHES ENDPOINTS


def job_matches_to_dict(match_list):
    """
    Helper function for writing JSON output match tuple lists
    :param match_list: Student job_matches field
    :return: dictionary of listings, in order of highest to lowest match
    """
    sorted_matches = sorted(match_list, key=lambda x: x[1], reverse=True)
    out_json = []
    for m in sorted_matches:
        listing = Listing.query.get(m[0])
        out_json.append(dumps(listing))


def listing_matches_to_dict(match_list):
    """
    Similar to job_matches_to_dict, but for listing matches
    :param match_list: Listing student_matches field
    :return: dictionary of students, in order of highest to lowest match
    """
    sorted_matches = sorted(match_list, key=lambda x: x[1], reverse=True)
    out_json = []
    for m in sorted_matches:
        student = Student.query.filter(Student.username == m[0])
        out_json.append(dumps(student))


@app.route('/v1/candidate/<string:username>/getMatches', methods=['GET'])
def get_student_matches(username):
    """ Return existing matches for a given student (username) """
    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj:
        return dumps(job_matches_to_dict(st_obj.job_matches))
    else:
        return dumps({"reason": "Student not found"}), 404


@app.route('/v1/employer/<string:listing_id>/getMatches', methods=['GET'])
def get_listing_matches(listing_id):
    """ Return existing matches for a given listing id """
    listing_obj = Listing.query.get(listing_id)

    if listing_obj:
        return dumps(listing_matches_to_dict(listing_obj.student_matches)), 200
    else:
        return dumps({"reason": "Listing {} not found".format(listing_id)}), 404


@app.route('/v1/candidate/<string:username>/computeMatches', methods=['POST'])
def compute_matches(username):
    """ Calculate new matches and return them """
    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj:
        new_matches = st_obj.job_matches

        # compare student to all listings
        for listing_obj in Listing.query.all():
            ratio = student_listing_matcher(st_obj, listing_obj)
            if ratio > 0.33:
                if listing_obj.mongo_id not in st_obj.declined_jobs and \
                                listing_obj.mongo_id not in st_obj.favorited_jobs:
                    new_matches.append((str(listing_obj.mongo_id), ratio))

                if st_obj.username not in listing_obj.student_matches:
                    listing_obj.student_matches.append((st_obj.username, ratio))

            listing_obj.save()  # update listing with new student match

        st_obj.job_matches = list(set(new_matches))
        st_obj.save()

        return dumps(job_matches_to_dict(st_obj.job_matches)), 200
    else:
        return dumps({"reason": "Student not found"}), 404

# FAVORITE/DECLINE JOB ENDPOINTS


@app.route('/v1/candidate/<string:username>/declineJob/<string:job_id>', methods=['POST'])
def decline_job(username, job_id):

    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj:

        for job_match in st_obj.job_matches:

            if job_match == job_id:
                st_obj.job_matches.remove(job_id)  # not sure if pass by object??
                st_obj.declined_jobs.append(job_id)

        for fav_job in st_obj.favorited_jobs:

            if job_match == job_id:

                st_obj.favorited_jobs.remove(job_id)
                st_obj.declined_jobs.append(job_id)

        st_obj.save()

        return dumps(st_obj.declined_jobs)
    else:
        return 'Username Not Found'  # TODO: improve error handling

    return 'Success'


@app.route('/v1/candidate/<string:username>/favoriteJob/<string:job_id>', methods=['POST'])
def favorite_job(username, job_id):

    st_obj = Student.query.filter(Student.username == username).first()  # TODO: fix so not case sensitive

    if st_obj is not None:  # TODO: add error handling

        for job_match in st_obj.job_matches:

            if (job_match == job_id):
                st_obj.job_matches.remove(job_id)
                st_obj.favorited_jobs.append(job_id)

        st_obj.save()

        return dumps(st_obj.favorited_jobs)
    else:
        return 'Username Not Found'  # TODO: improve error handling

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


@app.route('/v1/employer/<string:employer>/favoriteCandidate/<string:candidate>/<string:job_name>', methods=['POST'])
def favorite_candidate(employer, job_name, candidate):
    # TODO: search employer job listing to favorite candidate
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


@app.route('/v1/listings/all', methods=['GET'])
def get_all_listings():
    return dumps([listing_to_dict(l) for l in Listing.query.all()]), 200


@app.route('/v1/skills/all', methods=['GET'])
def get_all_skills():
    all_skills = []
    for listing in Listing.query.all():
        all_skills += listing.desired_skills
    return dumps(sorted(set(all_skills))), 200



