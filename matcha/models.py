from app import mongo
from mongoalchemy.fields import *



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
    job_matches = mongo.ListField(mongo.StringField())  # list
    favorited_jobs = mongo.ListField(mongo.StringField())  # list


class Employer(mongo.Document):
    company_name = mongo.StringField()
    description = mongo.StringField()
    num_employees = mongo.IntField()
    email = mongo.StringField()
    password = mongo.StringField()
    location = mongo.StringField()