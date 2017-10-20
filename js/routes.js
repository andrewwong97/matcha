import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Main from './Main';

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/listings/all">Listings</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Main}/>
      
    </div>
  </Router>
)
export default AppRouter;