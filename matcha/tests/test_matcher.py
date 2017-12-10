import json
from os.path import *
from nose.tools import *
from matcha.views import *


def test_matcher():
    student = dict_to_student({'skills': ['reactjs', 'python'], 'email': 'a', 'password': 'p', 'looking_for': ['Internship']})
    listing = dict_to_listing({'desired_skills': ['reactjs', 'python', 'django', 'javascript']})
    assert skills_matcher(student, listing) > 0
