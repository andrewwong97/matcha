# Matcha - intelligent job matching platform
# OOSE Group 16
JHU Object Oriented Software Engineering - Fall 2017

A platform that seamlessly connects employers and qualified candidates with matching that runs deeper than the run-of-the-mill capacity planning tools or jobs marketplaces -- autoplay for recruiting.

## Prerequisites

Package managers:

- `npm`/`yarn`
- `pip`

## To run:

Note: this assumes you have the required dependencies to create virtual environments, Python Django, and NodeJS
First time:
```
cd matcha/matcha
pip install virtualenvwrapper   # only if you don't already have this

mkvirtualenv matcha             # the name of your virtual environment
pip install -r requirements.txt
npm install -g yarn webpack     # only if you don't already have these
yarn install                    # we use Yarn to install js dependencies
python app.py                   # run flask server in current tab
webpack --watch                 # run webpack server in another tab
```
Navigate to `localhost:5000` on your favorite browser.

Not your first time (if you have created a virtual environment already):
```
workon matcha
python app.py                   # in current tab
webpack --watch                 # in another tab
```

### Common Errors in Setup:
`no module named <module-name>`: We're running Flask on Python 3, so make sure you install the module using `pip3` if you installed using `pip` and are still receiving this error. 

## Running Tests

1. Navigate to top level matcha directory
2. Run `pytest tests` (runs `pytest` on all valid test functions inside the `tests/` directory)

## DB Access - MongoDB

We have a MongoDB instance hosted on mLab, see db access details here. Since it's configured inside `app.py`, you will likely not need to access the db much. Here are the db user details, for the mLab account details please message Andrew Wong (awong52@jhu.edu) if necessary.
```
dbname: matcha
db user: oose
password: letmein
```
