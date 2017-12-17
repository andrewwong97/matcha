from flask import Flask
from flask_cors import CORS
from flask.ext.mongoalchemy import MongoAlchemy


app = Flask(__name__)
app.secret_key = 'matcha'
app.config.from_pyfile('config.py')
CORS(app)
mongo = MongoAlchemy(app)

# keep here to avoid circular dep
from views import *

if __name__ == '__main__':
    import nltk
    from fixtures import *
    import pymongo
    from config import MONGOALCHEMY_CONNECTION_STRING

    nltk.download('punkt')
    nltk.download('stopwords')
    db = pymongo.MongoClient(MONGOALCHEMY_CONNECTION_STRING).matcha2

    try:
        has_listing = db.Listing.find()[0]
    except IndexError:
        populate_listings()

    try:
        has_skill = db.Skill.find()[0]
    except IndexError:
        populate_skills()

    app.run(host='0.0.0.0')

