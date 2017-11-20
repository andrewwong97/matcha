import json
from nose.tools import *
from matcha.views import *


@raises(KeyError)
def test_invalid_linkedin_token():
    token_dict = linkedin_token('some-invalid-auth-code')  # not a base 64 string
    assert token_dict['access_token'] and token_dict['expires_in']


@raises(KeyError)
def test_invalid_linkedin_profile_get():
    profile = linkedin_basic_profile('definitely-not-a-valid-token')  # not a base 64 string
    assert profile['firstName'] and profile['lastName']


def test_linkedin_to_student():
    sample_linkedin_response = json.loads(open('./sample_linkedin_response.json', 'r').read())
    sample_linkedin_response['emailAddress'] = 'sample-username-that-will-be-deleted'
    st_obj = li_to_student(sample_linkedin_response)
    st_obj.save()

    st_test = Student.query.filter(Student.username == 'sample-username-that-will-be-deleted').first()

    assert st_obj.first_name == 'Andrew'
    assert st_obj.last_name == 'Wong'
    assert st_obj.location == 'Greater New York City Area'
    assert st_obj.username == 'sample-username-that-will-be-deleted'

    st_test.remove()
