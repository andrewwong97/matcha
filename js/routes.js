import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home';
import Listings from './Listings';
import Login from './Login';
import Signup from './Signup';

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/listings/display">Listings</Link></li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/listings/display" component={Listings} />
      
    </div>
  </Router>
)

export default AppRouter;