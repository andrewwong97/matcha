from nose.tools import *
from views import *


def test_create_empty_student():
    s = Student()
    assert isinstance(s, Student)


@raises(AttributeError)
def test_empty_student_no_attributes():
    s = Student()
    username = s.username


@raises(AttributeError)
def test_util_empty_student_to_dict():
    s = Student()
    student_to_dict(s)


@raises(KeyError)
def test_util_incomplete_dict_to_student():
	d = {
		'username': '<username>',
		'password': '<password>',
		'skills': []
	}
	dict_to_student(d)