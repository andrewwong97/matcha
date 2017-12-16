# Use only if database has been flushed for whatever reason

import pymongo
import json
import os
import config


def populate():
    client = pymongo.MongoClient(config.MONGOALCHEMY_CONNECTION_STRING)

    db = client.matcha2

    current_dir = os.path.dirname(os.path.realpath(__file__))
    listings = json.loads(open(os.path.join(current_dir, 'fixtures.json'), 'r').read())

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


if __name__ == '__main__':
    ans = raw_input(
        "DANGER! This may create duplicates of objects already in the database. Are you sure you want to proceed? (y/N)")
    if ans.lower() == 'y':
        populate()
    else:
        print 'Exiting...'
