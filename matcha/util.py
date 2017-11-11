import json, base64, os
from urllib import urlencode
from models import Student


def student_to_dict(st):
    """
    Convert MongoAlchemy Student fields to dictionary
    :param st: Student object
    :return: dictionary with keys as field name and value as field value
    """
    st_dict = dict()
    st_dict['username'] = st.username
    st_dict['first_name'] = st.first_name
    st_dict['last_name'] = st.last_name
    st_dict['email'] = st.email
    st_dict['password'] = st.password
    st_dict['linkedin_token'] = st.linkedin_token
    st_dict['github_token'] = st.github_token
    st_dict['skills'] = st.skills  # list of strings
    st_dict['need_visa'] = st.need_visa  # boolean
    st_dict['location'] = st.location  # string
    st_dict['looking_for'] = st.looking_for  # list
    st_dict['job_matches'] = st.job_matches  # list
    st_dict['favorited_jobs'] = st.favorited_jobs  # list

    return st_dict


def dict_to_student(d):
    """
    Convert dictionary to Student object
    :param d: dictionary
    :return: Student object
    """
    st_obj = Student()
    st_obj.username = d['username']  # each student has a unique username
    st_obj.first_name = d['first_name']
    st_obj.last_name = d['last_name']
    st_obj.email = d['email']
    st_obj.password = d['password']
    st_obj.linkedin_token = d['linkedin_token']
    st_obj.github_token = d['github_token']
    st_obj.skills = d['skills']  # list of strings
    st_obj.need_visa = d['need_visa']  # boolean
    st_obj.location = d['location']  # string
    st_obj.looking_for = d['looking_for']  # list
    st_obj.job_matches = d['job_matches']  # list
    st_obj.favorited_jobs = d['favorited_jobs']  # list

    return st_obj


def linkedin_redirect_uri():
    current_dir = os.path.dirname(os.path.realpath(__file__))
    config = json.loads(open(os.path.join(current_dir, 'config.json'), 'r').read())
    csrf = base64.b64encode('matcha')  # unique string that is hard to guess
    options = {
        'response_type': 'code',
        'client_id': config['linkedin_client_id'],
        'redirect_uri': 'http://localhost:5000',
        'state': csrf,

    }
    return 'https://www.linkedin.com/oauth/v2/authorization?' + urlencode(options)
