from flask import Flask, render_template
from flask_pymongo import PyMongo

import random

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'matcha'
app.config['MONGO_URI'] = 'mongodb://oose:letmein@ds015962.mlab.com:15962/matcha'
# UNSAFE, CHANGE IN PRODUCTION

mongo = PyMongo(app)

@app.route('/')
def hello_world():
  return render_template('index.html')


@app.route('/listing/new')
def create_job_listing():
    listings = mongo.db.listings  # collection
    salary = random.randint(5000, 10000)
    listings.insert({'name': 'Software Engineering Intern', 'Salary': salary})
    return 'Success!'


if __name__ == '__main__':
  app.run(debug=True)

