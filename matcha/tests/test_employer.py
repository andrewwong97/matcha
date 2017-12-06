from nose.tools import *
from matcha.views import *
from mongoalchemy.exceptions import MissingValueException
import uuid


def test_create_empty_employer():
    e = Employer()
    assert isinstance(e, Employer)


@raises(AttributeError)
def test_empty_employer_no_attributes():
    e = Employer()
    company_name = e.company_name


@raises(AttributeError)
def test_empty_employer_no_location():
    e = Employer()
    location = e.location


@raises(AttributeError)
def test_util_empty_employer_to_dict():
    e = Employer()
    employer_to_dict(e)


@raises(KeyError)
def test_util_incomplete_dict_to_employer():
    d = {
        'company_name': '<company_name>',
        'description': '<description>',
        'email': ''
    }
    dict_to_employer(d)


def test_create_employer_profile():
    rand_uname = str(uuid.uuid4())
    em_obj = Employer()
    em_obj.company_name = rand_uname
    em_obj.description = 'description'
    em_obj.num_employees = 0
    em_obj.username = 'username'
    em_obj.email = 'email'
    em_obj.password = 'password'
    em_obj.location = 'location'
    em_obj.save()

    em_test = Employer.query.filter(Employer.company_name == rand_uname).first()

    assert em_test.company_name == rand_uname
    assert em_test.description == 'description'
    assert em_test.num_employees == 0
    assert em_test.username == 'username'
    assert em_test.email == 'email'
    assert em_test.password == 'password'
    assert em_test.location == 'location'

    em_obj.remove()


def test_edit_employer_profile():
    rand_uname = str(uuid.uuid4())
    em_obj = Employer()
    em_obj.company_name = rand_uname
    em_obj.description = 'description'
    em_obj.num_employees = 0
    em_obj.username = 'username'
    em_obj.email = 'email'
    em_obj.password = 'password'
    em_obj.location = 'location'
    em_obj.save()

    em_test = Employer.query.filter(Employer.company_name == rand_uname).first()

    assert em_test.company_name == rand_uname
    assert em_test.description == 'description'

    em_test.description = 'new_description'
    em_test.save()

    new_em_test = Employer.query.filter(Employer.company_name == rand_uname).first()

    assert new_em_test.company_name == rand_uname
    assert new_em_test.description == 'new_description'

    new_em_test.remove()


@raises(MissingValueException)
def test_employer_profile_incomplete():
    rand_uname = str(uuid.uuid4())
    em_obj = Employer()
    em_obj.company_name = rand_uname
    # no description
    em_obj.num_employees = 0
    em_obj.email = 'email'
    em_obj.password = 'password'
    em_obj.location = 'location'
    em_obj.save()

    em_test = Employer.query.filter(Employer.company_name == rand_uname).first()

    assert em_test.company_name == rand_uname
    desc = em_test.description

    em_test.remove()