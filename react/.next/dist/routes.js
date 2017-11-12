'use strict';

var routes = module.exports = require('next-routes')();

// all other routes are implicitly defined
// name, pattern, page
// for more info: https://github.com/fridays/next-routes
routes.add('studentProfile', '/profile/:profile_id', 'StudentProfile');