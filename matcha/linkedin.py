import json, base64, os, requests
from urllib import urlencode
import nltk
from nltk.corpus import stopwords


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


def linkedin_to_skills_list(profileJSON):
    """
    Convert student json profile to list of skills
    :param profileJSON: profileJSON string
    :return: list of tokenized skills
    """
    if type(profileJSON) == 'dict':
        profileJSON = json.dumps(profileJSON)

    tokens = nltk.word_tokenize(profileJSON)
    stop_words = set(stopwords.words('english'))
    skills = [t for t in tokens if t not in stop_words]
    return skills
