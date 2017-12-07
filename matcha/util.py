from models import Student, Employer, Listing


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

    return st_dict


def dict_to_student(d):
    """
    Convert dictionary to Student object
    :param d: dictionary
    :return: Student object
    """
    st_obj = Student()
    st_obj.username = d['username']  # each student has a unique username
    st_obj.first_name = d['first_name']
    st_obj.last_name = d['last_name']
    st_obj.email = d['email']
    st_obj.password = d['password']
    st_obj.linkedin_token = d['linkedin_token']
    st_obj.github_token = d['github_token']
    st_obj.skills = d['skills']  # list of strings
    st_obj.need_visa = d['need_visa']  # boolean
    st_obj.location = d['location']  # string
    st_obj.looking_for = d['looking_for']  # list
    st_obj.job_matches = d['job_matches']  # list
    st_obj.favorited_jobs = d['favorited_jobs']  # list
    st_obj.declined_jobs = d['declined_jobs']  # list

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

    return em_dict


def dict_to_employer(d):
    """
    Convert dictionary to Employer object
    :param d: dictionary
    :return: Employer object
    """
    em_obj = Employer()
    em_obj.company_name = d['company_name']  # each student has a unique username
    em_obj.description = ''
    em_obj.num_employees = 0
    em_obj.username = d['email']
    em_obj.email = d['email']
    em_obj.password = d['password']
    em_obj.location = ''  # string

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

    return ls_dict

  
def dict_to_listing(d):
    """
    Convert dictionary to listing object
    :param d: dictionary
    :return: listing object
    """
    ls = Listing()
    ls.title = d['title']
    ls.description = d['description']
    ls.student_matches = d['student_matches']
    ls.salary = d['salary']
    ls.location = d['location']
    ls.desired_skills = d['desired_skills']
    ls.job_type = d['job_type']
    return ls

  
def matcher(student, listing):
    rating = 0
    for i in student.looking_for:
        if listing.job_type.lower() == i:
            return 0

    for skill in student.skills:
        for desired in listing.desired_skills:
            if skill.lower() == desired.lower():
                # add fuzzy matching here
                rating += 1

    return 1.0 * rating / (len(student.skills) + len(listing.desired_skills))
