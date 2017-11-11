# Matcha - intelligent job matching platform
# OOSE Group 16
JHU Object Oriented Software Engineering - Fall 2017

A platform that seamlessly connects employers and qualified candidates with matching that runs deeper than the run-of-the-mill capacity planning tools or jobs marketplaces -- autoplay for recruiting.

## Prerequisites

- `NodeJS`
- `npm`
- `pip`
- `Docker`

## To run a dockerized production build:

```
pip install docker-compose
docker-compose up -d --build    # deployed on port 5000
```

If the server isn't running, try switching off of Hopkins network since it tends to block requests from mLab, where we host our MongoDB instance. In future iterations, we plan to deploy a local Dockerized Mongo instance.

## To run dev:

Note: this assumes you have the required dependencies to create virtual environments, Python Django, and NodeJS. We use `webpack --watch` for hot reloading of React components during dev, but for production we will just use a static bundle.

Setup:
```
git clone this repository to your local
cd 2017-group-16

pip install virtualenvwrapper   # only if you don't already have this

mkvirtualenv matcha             # the name of your virtual environment
pip install -r requirements.txt
npm install -g yarn webpack     # only if you don't already have these
yarn install                    # we use Yarn to install js dependencies
```

Run:
```
python matcha/app.py            # run flask server in current tab
webpack --watch                 # run webpack server in another tab
```
Navigate to `localhost:5000` on your favorite browser.


### Common Errors in Setup:
`error traceback example`: _how to fix_

## Running Tests

1. Navigate to top level matcha directory
2. Run `pytest tests` (runs `pytest` on all valid test functions inside the `tests/` directory)

## DB Access - MongoDB

We have a MongoDB instance hosted on mLab, see db access details here. Since it's configured inside `app.py`, you will likely not need to access the db much. 

### mLab Login Details
```
user: oose-matcha
pass: matcha17
```

### DB User Details
```
dbname: matcha
db user: oose
password: letmein
```

## API
https://github.com/jhu-oose/2017-group-16/wiki/API

