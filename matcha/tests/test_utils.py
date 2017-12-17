import json
from os.path import *
from nose.tools import *
from matcha.views import *


def test_employer_required_fields():
    em = dict_to_employer({'email': 'a', 'password': 'p'})
    assert em.username == 'a'
    assert isinstance(em, Employer)
    assert isinstance(employer_to_dict(em), dict)
    assert employer_to_dict(em)['account_type'] == 'employer'


def test_student_required_fields():
    st = dict_to_student({'email': 'a', 'password': 'p'})
    assert isinstance(st, Student)
    assert isinstance(student_to_dict(st), dict)
    assert student_to_dict(st)['account_type'] == 'student'


def test_listing_required_fields():
    l = dict_to_listing({})
    assert isinstance(l, Listing)
    assert isinstance(listing_to_dict(l), dict)
    assert listing_to_dict(l)['title'] == '' and listing_to_dict(l)['account_type'] == 'listing'


def test_li_to_student():
    sample_linkedin_response = json.loads(open(join(dirname(realpath(__file__)), './sample_linkedin_response.json'), 'r').read())
    sample_linkedin_response['emailAddress'] = 'sample-username-that-will-be-deleted'
    st_obj = li_to_student(sample_linkedin_response)
    st_obj.save()

    st_test = Student.query.filter(Student.username == 'sample-username-that-will-be-deleted').first()

    assert st_obj.first_name == 'Andrew'
    assert st_obj.last_name == 'Wong'
    assert st_obj.location == 'Greater New York City Area'
    assert st_obj.username == 'sample-username-that-will-be-deleted'

    st_test.remove()
