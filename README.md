## Matcha - intelligent job matching platform (OOSE Group 16)
[![Build Status](https://travis-ci.com/jhu-oose/2017-group-16.svg?token=Du5Ucyp2pSQjddWdX9YH&branch=master)](https://travis-ci.com/jhu-oose/2017-group-16)

JHU Object Oriented Software Engineering - Fall 2017

A platform that seamlessly connects employers and qualified candidates with matching that runs deeper than the run-of-the-mill capacity planning tools or jobs marketplaces -- autoplay for recruiting.

## Home
![home](https://user-images.githubusercontent.com/7339169/34233890-d04bf866-e5b5-11e7-9d61-0fad27c9fc01.png)

## Student
![student](https://user-images.githubusercontent.com/7339169/34233905-e6aab1f6-e5b5-11e7-9929-bffca05d0e7e.png)

## Employer
![employer](https://user-images.githubusercontent.com/7339169/34233863-b170b472-e5b5-11e7-9824-9769b78b85b8.png)

# Prerequisites

- `NodeJS`/`npm`
- `pip`
- `Docker`

## To run Docker build:

```
pip install docker-compose
docker-compose up --build    # deployed on port 3000
```

## Troubleshooting:

1. To see active container logs, run `docker ps` to find the names of your containers.
Then run `docker logs -f <CONTAINER_NAME>`.

**If for some reason Flask fails to connect to DB**: in `docker-compose.yml` remove the line containing `DEV=1`. The application will instead run on a local instance of MongoDB.

2. Each service (flask, react, db) can freely access each other via docker aliases (e.g. Flask can communicate with the database by using the alias 'matcha_mongo' to find the db port).

3. You can step into each container by entering the following command: `docker exec -it <CONTAINER_NAME> bash`. The `-i` flag means interactive mode, and `-t` flag allows you to name a container.

## Tests:

Run `docker exec -it matcha_flask bash -c "nosetests --with-coverage --cover-package matcha"` once you have the containers stood up.


# For Developers:

Note: this assumes you have the required dependencies to create virtual environments, Python Django, and NodeJS.

### Setup:
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

### Run:
```
DEV=1 python matcha/app.py            # run flask server in current tab
cd react && yarn dev                  # run react app in another tab
```

### Tests:
```
DEV=1 nosetests --with-coverage --cover-package matcha
```

Navigate to `localhost:3000` on your favorite browser.


### mLab Login Details (use on **DEV** only)
```
user: oose-matcha
pass: <ask @andrewwong97 for password>
```

### DB User Details
```
https://mlab.com/databases/matcha2
dbname: matcha2
db user: matcha
password: letmein
```
