const routes = module.exports = require('next-routes')()

// all other routes are implicitly defined
// name, pattern, page
// for more info: https://github.com/fridays/next-routes
routes
    .add('studentProfile', '/profile/student/:profile_id', 'student-profile')
    .add('employerProfile', '/profile/employer/:profile_id', 'employer-profile')
    .add('noneProfile', '/profile/undefined/:profile_id', 'index')



