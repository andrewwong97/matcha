from bson.json_util import dumps
from flask import (Flask, render_template, session, request,redirect, url_for)
from flask.ext.mongoalchemy import MongoAlchemy
from flask_cors import CORS


# Models and backend logic should be separated from app.py
from models import (Student, Employer)
from util import (student_to_dict, dict_to_student)


app = Flask(__name__)
app.secret_key = 'matcha'

app.config.from_pyfile('config.py')

mongo = MongoAlchemy(app)
CORS(app)


# catch-all for front end
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


@app.route('/v1/login', methods=['POST'])
def login():
    """
    Receive a request from the front end with username and password
    Check with database that this is a valid user
    Add username to session if valid, Else return 404
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
            session['username'] = username  # add current user to session
            print student_dict
            return dumps(student_dict), 200
        else:
            return dumps({}), 404


@app.route('/v1/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index')), 200


@app.route('/v1/createProfile', methods=['POST'])
def create_profile():
    req_data = request.get_json()
    student_obj = dict_to_student(req_data)
    student_obj.save()

    return dumps(student_to_dict(student_obj)), 200


@app.route('/v1/getProfile/<string:username>', methods=['GET'])
def get_profile(username):
    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj is not None:
        student_dict = student_to_dict(st_obj)
        return dumps(student_dict)
    else:
        return 'Username Not Found'  # TODO: improve error handling


@app.route('/v1/editProfile/<string:username>', methods=['POST'])
def edit_profile(username):
    new_data = request.get_json()  # dictionary with data from user
    st_obj = Student.query.filter(Student.username == username).first()

    if st_obj is not None:

        for key in new_data:
            setattr(st_obj, key, new_data[key])

        st_obj.save()
        return 'Success'  # TODO: change return value as needed
    else:
        return 'Username Not Found'  # TODO: improve error handling


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
    app.run()
