from nose.tools import *
from matcha.views import *
from mongoalchemy.exceptions import MissingValueException
import uuid


def test_create_empty_student():
    s = Student()
    assert isinstance(s, Student)


@raises(AttributeError)
def test_empty_student_no_attributes():
    s = Student()
    username = s.username


@raises(AttributeError)
def test_empty_student_no_skills():
    s = Student()
    skills = s.skills


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


def test_create_student_profile():
    rand_uname = str(uuid.uuid4())

    st_obj = Student()
    st_obj.username = rand_uname  # each student has a unique username
    st_obj.first_name = 'first_name'
    st_obj.last_name = 'last_name'
    st_obj.email = 'email'
    st_obj.password = 'password'
    st_obj.linkedin_token = 'linkedin_token'
    st_obj.github_token = 'github_token'
    st_obj.skills = ['skill1', 'skill2']  # list of strings
    st_obj.need_visa = 'need_visa'  # boolean
    st_obj.location = 'location'  # string
    st_obj.looking_for = ['job1', 'job2']  # list
    st_obj.job_matches = ['match1', 'match2']  # list
    st_obj.favorited_jobs = ['fav1', 'fav2']  # list
    st_obj.declined_jobs = []
    st_obj.save()

    st_test = Student.query.filter(Student.username == rand_uname).first()
    assert st_test.username == rand_uname
    assert st_test.first_name == 'first_name'
    assert st_test.last_name == 'last_name'
    assert st_test.email == 'email'
    assert st_test.password == 'password'
    assert st_test.linkedin_token == 'linkedin_token'
    assert st_test.github_token == 'github_token'
    assert st_test.skills[0] == 'skill1'
    assert st_test.skills[1] == 'skill2'
    assert st_test.need_visa == 'need_visa'
    assert st_test.location == 'location'
    assert st_test.looking_for[0] == 'job1'
    assert st_test.looking_for[1] == 'job2'
    assert st_test.job_matches[0] == 'match1'
    assert st_test.job_matches[1] == 'match2'
    assert st_test.favorited_jobs[0] == 'fav1'
    assert st_test.favorited_jobs[1] == 'fav2'
    assert st_test.declined_jobs == []

    st_test.remove()


def test_create_student_profile_mismatch():
    rand_uname = str(uuid.uuid4())
    st_obj = Student()
    st_obj.username = rand_uname
    st_obj.first_name = 'first_name'
    st_obj.last_name = 'last_name'
    st_obj.email = 'email'
    st_obj.password = 'password'
    st_obj.linkedin_token = 'linkedin_token'
    st_obj.github_token = 'github_token'
    st_obj.skills = ['skill1', 'skill2']  # list of strings
    st_obj.need_visa = 'need_visa'  # boolean
    st_obj.location = 'location'  # string
    st_obj.looking_for = ['job1', 'job2']  # list
    st_obj.job_matches = ['match1', 'match2']  # list
    st_obj.favorited_jobs = ['fav1', 'fav2']  # list
    st_obj.declined_jobs = []
    st_obj.save()

    st_test = Student.query.filter(Student.username == rand_uname).first()
    assert st_test.username == rand_uname
    assert st_test.last_name != 'DNE'  # records don't match up

    st_test.remove()


@raises(MissingValueException)
def test_student_profile_incomplete():
    rand_uname = str(uuid.uuid4())
    st_obj = Student()
    st_obj.username = rand_uname
    st_obj.save()

    st_test = Student.query.filter(Student.username == rand_uname).first()
    assert st_test.username == rand_uname
    fname = st_test.first_name

    st_test.remove()


def test_edit_student_profile():
    rand_uname = str(uuid.uuid4())
    st_obj = Student()
    st_obj.username = rand_uname
    st_obj.first_name = 'first_name'
    st_obj.last_name = 'last_name'
    st_obj.email = 'email'
    st_obj.password = 'password'
    st_obj.linkedin_token = 'linkedin_token'
    st_obj.github_token = 'github_token'
    st_obj.skills = ['skill1', 'skill2']  # list of strings
    st_obj.need_visa = 'need_visa'  # boolean
    st_obj.location = 'location'  # string
    st_obj.looking_for = ['job1', 'job2']  # list
    st_obj.job_matches = ['match1', 'match2']  # list
    st_obj.favorited_jobs = ['fav1', 'fav2']  # list
    st_obj.declined_jobs = []
    st_obj.save()

    st_test = Student.query.filter(Student.username == rand_uname).first()

    assert st_test.username == rand_uname
    assert st_test.first_name == 'first_name'

    st_test.first_name = 'new_first_name'
    st_test.save()

    new_st_test = Student.query.filter(Student.username == rand_uname).first()

    assert new_st_test.username == rand_uname
    assert new_st_test.first_name == 'new_first_name'

    new_st_test.remove()


def test_edit_student_profile_mismatch():
    rand_uname = str(uuid.uuid4())
    st_obj = Student()
    st_obj.username = rand_uname  # each student has a unique username
    st_obj.first_name = 'old_first_name'
    st_obj.last_name = 'last_name'
    st_obj.email = 'email'
    st_obj.password = 'password'
    st_obj.linkedin_token = 'linkedin_token'
    st_obj.github_token = 'github_token'
    st_obj.skills = ['skill1', 'skill2']  # list of strings
    st_obj.need_visa = 'need_visa'  # boolean
    st_obj.location = 'location'  # string
    st_obj.looking_for = ['job1', 'job2']  # list
    st_obj.job_matches = ['match1', 'match2']  # list
    st_obj.favorited_jobs = ['fav1', 'fav2']  # list
    st_obj.declined_jobs = []
    st_obj.save()

    st_test = Student.query.filter(Student.username == rand_uname).first()

    assert st_test.username == rand_uname
    assert st_test.first_name == 'old_first_name'

    st_test.first_name = 'new_first_name'
    st_test.save()

    new_st_test = Student.query.filter(Student.username == rand_uname).first()

    assert new_st_test.username == rand_uname
    assert new_st_test.first_name != 'old_first_name'  # records do not match up

    new_st_test.remove()