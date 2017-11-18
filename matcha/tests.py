from nose.tools import assert_equals, assert_raises
from views import *


def test_create_empty_student():
    s = Student()
    assert isinstance(s, Student)
