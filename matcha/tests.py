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

def test_create_empty_employer():
    e = Employer()
    assert isinstance(e, Employer)


@raises(AttributeError)
def test_empty_employer_no_attributes():
    e = Employer()
    company_name = e.company_name


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

def test_create_student_profile():

    st_obj = Student()
    st_obj.username = 'username'  # each student has a unique username
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
    st_obj.save()

    st_test = Student.query.filter(Student.username == 'username').first()

    assert st_test.username == 'username'
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

    st_obj.remove()

def test_edit_student_profile():

    st_obj = Student()
    st_obj.username = 'username'  # each student has a unique username
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
    st_obj.save()

    st_test = Student.query.filter(Student.username == 'username').first()

    assert st_test.username == 'username'
    assert st_test.first_name == 'first_name'

    st_test.first_name = 'new_first_name'
    st_test.save()

    new_st_test = Student.query.filter(Student.username == 'username').first()

    assert new_st_test.username == 'username'
    assert new_st_test.first_name == 'new_first_name'

    new_st_test.remove()

def test_create_employer_profile():

    em_obj = Employer()
    em_obj.company_name = 'company_name'
    em_obj.description = 'description'
    em_obj.num_employees = 0
    em_obj.email = 'email'
    em_obj.password = 'password'
    em_obj.location = 'location'
    em_obj.save()

    em_test = Employer.query.filter(Employer.company_name == 'company_name').first()

    assert em_test.company_name == 'company_name'
    assert em_test.description == 'description'
    assert em_test.num_employees == 0
    assert em_test.email == 'email'
    assert em_test.password == 'password'
    assert em_test.location == 'location'

    em_obj.remove()

def test_edit_employer_profile():

    em_obj = Employer()
    em_obj.company_name = 'company_name'
    em_obj.description = 'description'
    em_obj.num_employees = 0
    em_obj.email = 'email'
    em_obj.password = 'password'
    em_obj.location = 'location'
    em_obj.save()

    em_test = Employer.query.filter(Employer.company_name == 'company_name').first()

    assert em_test.company_name == 'company_name'
    assert em_test.description == 'description'

    em_test.description = 'new_description'
    em_test.save()

    new_em_test = Employer.query.filter(Employer.company_name == 'company_name').first()

    assert new_em_test.company_name == 'company_name'
    assert new_em_test.description == 'new_description'

    new_em_test.remove()




