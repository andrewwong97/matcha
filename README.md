# Matcha - OOSE Group 16
JHU Object Oriented Software Engineering - Fall 2017

A platform that seamlessly connects employers and qualified candidates with matching that runs deeper than the run-of-the-mill capacity planning tools or jobs marketplaces -- autoplay for recruiting.

## To run:

Note: this assumes you have the required dependencies to create virtual environments, Python Django, and NodeJS
First time:
```
cd matcha/matcha
mkvirtualenv matcha
pip install -r requirements
npm install -g yarn
yarn                        # we use Yarn to install js dependencies
./manage.py migrate
./manage.py runserver       # run django server
node server.js              # run react
```
Navigate to `localhost:8000` on your favorite browser.

Not first time (if you have created a virtual environment already):
```
workon matcha
./manage.py runserver
node server.js
```

## To create an admin account:
```
workon matcha
./manage.py createsuperuser
```
Navigate to `localhost:8000/admin` and log in

