import json
import os
import pymongo
from config import MONGOALCHEMY_CONNECTION_STRING

client = pymongo.MongoClient(MONGOALCHEMY_CONNECTION_STRING)
db = client.matcha2
current_dir = os.path.dirname(os.path.realpath(__file__))


def populate_listings():
    listings = json.loads(open(os.path.join(current_dir, 'listing_fixtures.json'), 'r').read())

    for l in listings:
        db.Listing.insert({
            'title': l['name'],
            'description': '',
            'employer': l['employer'],
            'salary': l['salary'],
            'desired_skills': list(l['desired_skills']),
            'job_type': [l['job_type']],
            'student_matches': list(),
            'location': 'New York'
        })


def populate_skills():
    skills = [i.strip().split(',')[0] for i in open(os.path.join(current_dir, 'skill_fixtures.txt'), 'r').readlines()[1:]]
    for sk in skills:
        db.Skill.insert({
            'name': sk
        })