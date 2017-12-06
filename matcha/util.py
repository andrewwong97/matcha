import json, base64, os, requests, re
from urllib import urlencode
from models import Student, Employer, Listing
from app import mongo



def student_to_dict(st):
    """
    Convert MongoAlchemy Student fields to dictionary
    :param st: Student object
    :return: dictionary with keys as field name and value as field value
    """
    st_dict = dict()
    #st_dict['_id'] = st._id['$oid']
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
    #st_obj._id = d['_id']
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

def employer_to_dict(em):
    """
    Convert MongoAlchemy Employer fields to dictionary
    :param em: Employer object
    :return: dictionary with keys as field name and value as field value
    """
    em_dict = dict()
    em_dict['company_name'] = em.company_name
    em_dict['description'] = ''
    em_dict['num_employees'] = 0
    em_dict['email'] = em.email
    em_dict['password'] = em.password
    em_dict['location'] = ''

    return em_dict


def dict_to_employer(d):
    """
    Convert dictionary to Employer object
    :param d: dictionary
    :return: Employer object
    """
    em_obj = Employer()
    em_obj.company_name = d['company_name']  # each student has a unique username
    em_obj.description = ''
    em_obj.num_employees = 0
    em_obj.email = d['email']
    em_obj.password = d['password']
    em_obj.location = ''  # string

    return em_obj


def listing_to_dict(ls_obj):
    """
    Convert MongoAlchemy listing fields to dictionary
    :param st: listing object
    :return: dictionary with keys as field name and value as field value
    """
    ls_dict = dict()
    ls_dict['_id'] = ls_obj._id
    ls_dict['title'] = ls_obj.title
    ls_dict['description'] = ls_obj.description
    ls_dict['employer'] = ls_obj.employer
    ls_dict['student_matches'] = ls_obj.student_matches
    ls_dict['salary'] = ls_obj.salary
    ls_dict['location'] = ls_obj.location
    ls_dict['desired_skills'] = ls_obj.desired_skills
    ls_dict['job_type'] = ls_obj.job_type

    return ls_dict

def dict_to_listing(d):
    """
    Convert dictionary to listing object
    :param d: dictionary
    :return: listing object
    """
    ls = Listing()
    ls.title = d['title']
    ls.description = d['description']
    ls.employer = d['employer']
    ls.student_matches = d['student_matches']
    ls.salary = d['salary']
    ls.location = d['location']
    ls.desired_skills = d['desired_skills']
    ls.job_type = d['job_type']
    return ls


def config_dict():
    current_dir = os.path.dirname(os.path.realpath(__file__))
    return json.loads(open(os.path.join(current_dir, 'config.json'), 'r').read())


def linkedin_redirect_uri():
    config = config_dict()
    csrf = base64.b64encode('matcha')  # unique string that is hard to guess
    options = {
        'response_type': 'code',
        'client_id': config['linkedin_client_id'],
        'redirect_uri': 'http://localhost:3000/auth-callback',
        'state': csrf,

    }
    return 'https://www.linkedin.com/oauth/v2/authorization?' + urlencode(options)


def linkedin_token(auth_code):
    """
    Exchange auth code for auth token, returns a JSON dict of token and expiration
    :param auth_code: code received from callback
    :returns dict with the form {'access_token': <token>, 'expires_in': <seconds>}
    """
    config = config_dict()
    options = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'redirect_uri': 'http://localhost:3000/auth-callback',
        'client_id': config['linkedin_client_id'],
        'client_secret': config['linkedin_client_secret'],
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post('https://www.linkedin.com/oauth/v2/accessToken', params=options, headers=headers)
    return r.json()


def linkedin_basic_profile(token):
    params = {
        'format': 'json'
    }
    headers = {
        'x-li-format': 'json',
        'Authorization': 'Bearer {}'.format(token),
        'Connection': 'Keep-Alive'
    }
    fields = '(id,first-name,last-name,positions,industry,headline,specialties,location,public-profile-url,email-address)'
    r = requests.get('https://api.linkedin.com/v1/people/~:{}'.format(fields), params=params, headers=headers)
    return r.json()


def matcher(candidate, listing):
    if str(candidate.looking_for[0]).lower() != listing.job_type.lower():
        return 0

    # Will not work on invalid access token, suggestion: scrape based on linkedin email
    # li_prof = linkedin_basic_profile(linkedin_token(candidate.linkedin_token))

    # tokenized = re.split('[^a-zA-Z]', str(li_prof))
    rating = 0
    # for token in tokenized:
    #     for skill in listing.desired_skills:
    #         if str(token).lower() == str(skill).lower():
    #             rating += 1
    #
    # rating = rating / len(tokenized)

    for skill in candidate.skills:
        for desired in listing.desired_skills:
            if skill.lower() == desired.lower():
                rating += 1

    return 1.0 * rating / (len(candidate.skills) + len(listing.desired_skills))


def li_to_student(d):
    """
    Convert linkedin profile API response to student object
    :param d: Linkedin API response dict
    :return: Student representation
    """

    st_obj = Student()
    st_obj.username = d['emailAddress']  # each student has a unique username
    st_obj.first_name = d['firstName']
    st_obj.last_name = d['lastName']
    st_obj.email = d['emailAddress']
    st_obj.password = ''
    st_obj.linkedin_token = ''
    st_obj.github_token = ''
    st_obj.skills = []
    st_obj.need_visa = ''
    st_obj.location = d['location']['name']  # string
    st_obj.looking_for = []
    st_obj.job_matches = []
    st_obj.favorited_jobs = []

    return st_obj
