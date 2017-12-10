from app import mongo
from mongoalchemy.fields import *

# class MatchField(TupleField):
#     def __init__(self, **kwargs):
#         ''' :param item_types: instances of :class:`Field`, in the order they \
#                     will appear in the tuples.
#             :param kwargs: arguments for :class:`Field`
#         '''
#         super(MatchField, self).__init__(FloatField(), StringField(), **kwargs)
#     def schema_json(self):
#         super_schema = super(MatchField, self).schema_json()
#         return dict(**super_schema)

class Student(mongo.Document):
    username = mongo.StringField()
    first_name = mongo.StringField()
    last_name = mongo.StringField()
    email = mongo.StringField()
    password = mongo.StringField()
    linkedin_token = mongo.StringField()
    github_token = mongo.StringField()
    skills = mongo.ListField(mongo.StringField())
    location = mongo.StringField()
    need_visa = mongo.StringField()
    looking_for = mongo.ListField(mongo.StringField())  # list
    job_matches = mongo.ListField(mongo.StringField())
    favorited_jobs = mongo.ListField(mongo.StringField())  # list
    declined_jobs = mongo.ListField(mongo.StringField())  # list


class Employer(mongo.Document):
    company_name = mongo.StringField()
    description = mongo.StringField()
    num_employees = mongo.IntField()
    username = mongo.StringField()
    email = mongo.StringField()
    password = mongo.StringField()
    location = mongo.StringField()


class Listing(mongo.Document):
    title = mongo.StringField()
    description = mongo.StringField()
    employer = mongo.StringField()
    student_matches = mongo.ListField(mongo.StringField())
    salary = mongo.FloatField()
    location = mongo.StringField()
    desired_skills = mongo.ListField(mongo.StringField())
    job_type = mongo.ListField(mongo.StringField())

