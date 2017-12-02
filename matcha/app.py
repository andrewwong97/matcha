from flask import Flask
from flask_cors import CORS
from flask.ext.mongoalchemy import MongoAlchemy

app = Flask(__name__)
app.secret_key = 'matcha'
app.config.from_pyfile('config.py')
CORS(app)
mongo = MongoAlchemy(app)

from views import *

if __name__ == '__main__':
    import nltk
    nltk.download('punkt')
    app.run(host='0.0.0.0')
