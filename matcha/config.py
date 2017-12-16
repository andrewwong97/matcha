import os

MONGOALCHEMY_DATABASE = 'matcha2'
MONGOALCHEMY_CONNECTION_STRING = 'mongodb://matcha:letmein@ds129146.mlab.com:29146/matcha2' \
    if os.environ.get('DEV') else 'mongodb://matcha:letmein@matcha_mongo:27017'
SECRET_KEY = 'matcha'
DEBUG = True
HOST = '0.0.0.0'
