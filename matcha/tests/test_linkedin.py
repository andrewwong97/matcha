from nose.tools import *
from matcha.views import *
import json
import os
import urlparse
from matcha.linkedin import config_dict


def setup():
    import nltk
    nltk.download('punkt')
    nltk.download('stopwords')


def teardown():
    pass


def test_li_config_dict():
    cfg = config_dict()
    assert 'linkedin_client_id' in cfg and 'linkedin_client_secret' in cfg


def test_li_redirect_uri():
    uri = linkedin_redirect_uri()
    o = urlparse.urlparse(uri)
    params = urlparse.parse_qs(o.query)
    assert o.scheme == 'https'
    assert 'response_type' in params
    assert 'client_id' in params
    assert 'redirect_uri' in params
    assert 'state' in params


@raises(KeyError)
def test_invalid_linkedin_token():
    token_dict = linkedin_token('some-invalid-auth-code')  # not a base 64 string
    assert token_dict['access_token'] and token_dict['expires_in']


def test_get_invalid_basic_profile():
    invalid_profile = linkedin_basic_profile('not a token')
    assert 'emailAddress' not in invalid_profile
    assert 'firstName' not in invalid_profile


@raises(KeyError)
def test_invalid_linkedin_profile_dict_access():
    profile = linkedin_basic_profile('definitely-not-a-valid-token')  # not a base 64 string
    assert profile['firstName'] and profile['lastName']


@with_setup(setup, teardown)
def test_linkedin_to_skills_list():
    current_dir = os.path.dirname(os.path.realpath(__file__))
    data = json.loads(open(os.path.join(current_dir, 'sample_linkedin_response.json'), 'r').read())
    skills = linkedin_to_skills_list(data)
    assert 'meteorjs' in skills
    assert 'python' in skills