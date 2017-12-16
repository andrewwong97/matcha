# Use only if database has been flushed for whatever reason

import pymongo, json

def populate():
	client = pymongo.MongoClient('mongodb://matcha:letmein@ds129146.mlab.com:29146/matcha2')

	db = client.matcha2

	listings = json.loads(open('fixtures.json','r').read())


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
	ans = raw_input("DANGER! This may create duplicates of objects already in the database. Are you sure you want to proceed? (y/n)")
	if ans.lower() == 'y':
		populate()
	else:
		print 'Exiting...'
