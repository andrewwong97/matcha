# Changelog

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
