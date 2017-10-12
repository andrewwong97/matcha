# Matcha
JHU Object Oriented Software Engineering - Fall 2017

A platform that seamlessly connects employers and qualified candidates with matching that runs deeper than the run-of-the-mill capacity planning tools or jobs marketplaces -- autoplay for recruiting.

## To run:

Note: this assumes you have the required dependencies to create virtual environments, Python Django, and NodeJS
First time:
```
mkvirtualenv matcha
pip install -r requirements
npm install -g yarn
yarn
./manage.py runserver # run django server
node server.js # run react

```

Not first time:
```
workon matcha
./manage.py runserver
node server.js
```
