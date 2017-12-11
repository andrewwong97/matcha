from nose.tools import *
from matcha.views import *
from matcha.matcher import *


def test_match_job_type_invalid():
    student = dict_to_student({'skills': ['reactjs', 'python'], 'email': 'a', 'password': 'p', 'looking_for': ['CEO']})
    listing = dict_to_listing({'desired_skills': ['reactjs', 'python', 'django', 'javascript'], 'job_type': ['Co-op']})
    assert student_listing_matcher(student, listing) == 0


def test_skills_matcher_proper_subset():
    student = dict_to_student({'skills': ['reactjs', 'python'], 'email': 'a', 'password': 'p', 'looking_for': ['Internship']})
    listing = dict_to_listing({'desired_skills': ['reactjs', 'python', 'django', 'javascript']})
    assert student_listing_matcher(student, listing) == 1


def test_match_more_than_half():
    student = ['react', 'python', 'django', 'java', 'node']
    listing = ['react', 'java', 'angular', 'node']
    assert match(student, listing) > .5


def test_matcher_fuzzy_partial():
    assert fuzzy_partial('yes', 'no') < .5