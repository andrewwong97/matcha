from flask import Flask
from flask_cors import CORS
from flask.ext.mongoalchemy import MongoAlchemy
from config import MONGOALCHEMY_CONNECTION_STRING

app = Flask(__name__)
app.secret_key = 'matcha'
app.config.from_pyfile('config.py')
CORS(app)
mongo = MongoAlchemy(app)

# keep here to avoid circular dep
from views import *

if __name__ == '__main__':
    import nltk
    nltk.download('punkt')
    nltk.download('stopwords')
    try:
        import pymongo
        from populate_listings import populate
        db = pymongo.MongoClient(MONGOALCHEMY_CONNECTION_STRING).matcha2
        first = db.Listing.find()[0]
    except IndexError:
        populate()
    app.run(host='0.0.0.0')

