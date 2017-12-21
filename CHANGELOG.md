# Changelog

## Iteration 6 - 2017-12-20

### Added
- Skills as far as the eye can see - Skill collection in MongoDB allows us to persist a default listing of skills as well as additional ones from job listings
- Improve matching algorithm based on similarity parameters
- Ability to create Skill tags in register and profiles
- Asynchronous fetching of matches
- Deployed on server


### Changed
- Fixed toLowerCase issue
- Improved UX workflow and state updating
- Handle 404s gracefully on front end


### Removed

## Iteration 5 - 2017-12-08

### Added
- Automatic skill population based on your most recent Linkedin profile fetch
- Linkedin token refresh
- Listing endpoints: 
  - create job
  - favorite job
  - decline job
  - get current jobs
  - edit job
- Add listing from employer profile
- Edit student profile
- Fixed random 404s popping up after login/register
 

### Changed
- Better loaders
- If logged in, home page redirects to profile
- New matching algorithm uses sorted fuzzy string matching, good for subset comparison (when some of a student's skills matches all of a listing's desired skills)

### Removed


## Iteration 4 - 2017-11-17

### Added
- LinkedIn OAuth: you can now autopopulate your profile with LinkedIn
- Docker deployment
- Continuous integration: all tests must pass before merging a branch to master
- Nosetests
- Student and Employer profile screens
- Updated matching system
- Click-to-refresh matching and display on student profiles

### Changed
- Moved away from webpack, changed to NextJS to wrap React app for server-side rendering and isomorphic routes. Helps greatly in prefetching pages and data rendering times, where before it would take up to 15 seconds. 
- Hot reloading during development
- Better organization of Flask app structure with views, models, util, and more.
- Increased separation of concerns

### Removed
- Webpack bundling

## Iteration 3 - 2017-10-30

### Added
- Register, Login, Logout endpoints on backend
- Functioning Register frontend
- Sample Postman requests to test backend
- Basic React frontend implementation
- Linkedin matching and scraper

### Changed
- Migrated from Django/React/MySQL to Flask/React/MongoDB for easier development, less of a framework learning curve for team members, and faster flexibility in deployment 

### Removed
