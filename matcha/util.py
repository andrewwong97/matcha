from models import Student, Employer, Listing
import matcher


def student_listing_matcher(student, listing):
    """
    Match student to listing by student fields and desired listing fields
    :param student: Student obj
    :param listing: Listing obj
    :return: ratio between 0 and 1
    """
    same_job_type = False
    for i in student.looking_for:
        if i in listing.job_type:
            same_job_type = True
    if not same_job_type:
        return 0

    skill_ratio = matcher.match(student.skills, listing.desired_skills)
    return skill_ratio


def student_to_dict(st):
    """
    Convert MongoAlchemy Student fields to dictionary
    :param st: Student object
    :return: dictionary with keys as field name and value as field value
    """
    st_dict = dict()
    st_dict['username'] = st.username
    st_dict['first_name'] = st.first_name
    st_dict['last_name'] = st.last_name
    st_dict['email'] = st.email
    st_dict['password'] = st.password
    st_dict['linkedin_token'] = st.linkedin_token
    st_dict['github_token'] = st.github_token
    st_dict['skills'] = st.skills  # list of strings
    st_dict['need_visa'] = st.need_visa  # boolean
    st_dict['location'] = st.location  # string
    st_dict['looking_for'] = st.looking_for  # list
    st_dict['job_matches'] = st.job_matches  # list
    st_dict['favorited_jobs'] = st.favorited_jobs  # list
    st_dict['declined_jobs'] = st.declined_jobs  # list
    st_dict['account_type'] = 'Student'

    return st_dict


def dict_to_student(d):
    """
    Convert dictionary to Student object
    :param d: dictionary
    :return: Student object
    """
    st_obj = Student()
    st_obj.username = d['username'] if 'username' in d else ''  # each student has a unique username
    st_obj.first_name = d['first_name'] if 'first_name' in d else ''
    st_obj.last_name = d['last_name'] if 'last_name' in d else ''
    st_obj.email = d['email']
    st_obj.password = d['password']
    st_obj.linkedin_token = d['linkedin_token'] if 'linkedin_token' in d else ''
    st_obj.github_token = d['github_token'] if 'github_token' in d else ''
    st_obj.skills = d['skills'] if 'skills' in d else []  # list of strings
    st_obj.need_visa = d['need_visa'] if 'need_visa' in d else 'no'  # boolean STRING
    st_obj.location = d['location'] if 'location' in d else 'New York'  # string
    st_obj.looking_for = d['looking_for'] if 'looking_for' in d else ['Internship', 'Full-Time', 'Co-op']  # list
    st_obj.job_matches = d['job_matches'] if 'job_matches' in d else []  # list
    st_obj.favorited_jobs = d['favorited_jobs'] if 'favorited_jobs' in d else []  # list
    st_obj.declined_jobs = d['declined_jobs'] if 'declined_jobs' in d else []  # list

    return st_obj


def employer_to_dict(em):
    """
    Convert MongoAlchemy Employer fields to dictionary
    :param em: Employer object
    :return: dictionary with keys as field name and value as field value
    """
    em_dict = dict()
    em_dict['company_name'] = em.company_name
    em_dict['description'] = ''
    em_dict['num_employees'] = 0
    em_dict['username'] = em.username
    em_dict['email'] = em.email
    em_dict['password'] = em.password
    em_dict['location'] = ''
    em_dict['account_type'] = 'Employer'

    return em_dict


def dict_to_employer(d):
    """
    Convert dictionary to Employer object
    :param d: dictionary
    :return: Employer object
    """
    em_obj = Employer()
    em_obj.company_name = d['company_name'] if 'company_name' in d else ''
    em_obj.description = d['description'] if 'description' in d else ''
    em_obj.num_employees = d['num_employees'] if 'num_employees' in d else 0
    em_obj.username = d['email']
    em_obj.email = d['email']
    em_obj.password = d['password']
    em_obj.location = d['location'] if 'location' in d else ''

    return em_obj


def listing_to_dict(ls_obj):
    """
    Convert MongoAlchemy listing fields to dictionary
    :param st: listing object
    :return: dictionary with keys as field name and value as field value
    """
    ls_dict = dict()
    ls_dict['title'] = ls_obj.title
    ls_dict['description'] = ls_obj.description
    ls_dict['employer'] = ls_obj.employer
    ls_dict['student_matches'] = ls_obj.student_matches
    ls_dict['salary'] = ls_obj.salary
    ls_dict['location'] = ls_obj.location
    ls_dict['desired_skills'] = ls_obj.desired_skills
    ls_dict['job_type'] = ls_obj.job_type
    ls_dict['account_type'] = 'Listing'

    return ls_dict

  
def dict_to_listing(d):
    """
    Convert dictionary to listing object
    :param d: dictionary
    :return: listing object
    """
    ls = Listing()
    ls.title = d['title'] if 'title' in d else ''
    ls.description = d['description'] if 'description' in d else ''
    ls.employer = d['employer'] if 'employer' in d else ''
    ls.student_matches = d['student_matches'] if 'student_matches' in d else []
    ls.salary = float(d['salary']) if 'salary' in d else 0
    ls.location = d['location'] if 'location' in d else ''
    if 'desired_skills' in d:
        if type(d['desired_skills']) == 'str':
            skills = d['desired_skills'].strip().split(',')
            ls.desired_skills = [i.strip() for i in skills]
        else:
            ls.desired_skills = d['desired_skills']
    else:
        ls.desired_skills = []
    ls.job_type = d['job_type'] if 'job_type' in d else ['Internship', 'Full-Time']
    return ls


def li_to_student(d):
    """
    Convert linkedin profile API response to student object
    :param d: Linkedin API response dict
    :return: Student representation
    """

    st_obj = Student()
    st_obj.username = d['emailAddress']  # each student has a unique username
    st_obj.first_name = d['firstName']
    st_obj.last_name = d['lastName']
    st_obj.email = d['emailAddress']
    st_obj.password = ''
    st_obj.linkedin_token = ''
    st_obj.github_token = ''
    st_obj.skills = []
    st_obj.need_visa = ''
    st_obj.location = d['location']['name']  # string
    st_obj.looking_for = []
    st_obj.job_matches = []
    st_obj.favorited_jobs = []
    st_obj.declined_jobs = []

    return st_obj
