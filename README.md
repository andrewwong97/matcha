## Matcha - intelligent job matching platform (OOSE Group 16)
[![Build Status](https://travis-ci.com/jhu-oose/2017-group-16.svg?token=Du5Ucyp2pSQjddWdX9YH&branch=master)](https://travis-ci.com/jhu-oose/2017-group-16)

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
docker-compose up -d --build    # deployed on port 3000
```

If you are running Docker from AWS, make sure you allow traffic to port 3000 or change this line in `docker-compose.yml`:
```
FROM: - "3000:3000"
TO: - "80:3000"
```

If the server isn't running, try switching off of Hopkins network since it tends to block requests from mLab, where we host our MongoDB instance. In future iterations, we plan to deploy a local Dockerized Mongo instance.


## To run dev:

Note: this assumes you have the required dependencies to create virtual environments, Python Django, and NodeJS.

Setup:
```
git clone this repository to your local
cd 2017-group-16

pip install virtualenvwrapper   # HIGHLY ENCOURAGED
mkvirtualenv matcha

pip install -r requirements.txt
npm install -g yarn
cd react
yarn
```

Run:
```
python matcha/app.py            # run flask server in current tab
cd react && yarn dev            # run react app in another tab
```
Navigate to `localhost:3000` on your favorite browser.


## Running Tests

1. Navigate to top level matcha directory
2. Run `nosetests --with-coverage --cover-package matcha`

## DB Access - MongoDB

We have a MongoDB instance hosted on mLab, see db access details here. Since it's configured inside `app.py`, you will likely not need to access the db much. 

### mLab Login Details
```
user: oose-matcha
pass: matcha17
```

### DB User Details
```
https://mlab.com/databases/matcha2
dbname: matcha2
db user: matcha
password: letmein
```
