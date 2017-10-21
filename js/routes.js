import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  Switch
} from 'react-router-dom';


import Home from './Home';
import Listings from './Listings';
import Login from './Login';
import Signup from './Signup';

const LoginWithRouter = withRouter(Login);
const ListingsWithRouter = withRouter(Listings);

export default class AppRouter extends React.Component {
  render() {
    return (
      <div className="AppRouter">
        <Router>
          <div>
            <div className="Nav-wrapper">
            <div className="logo">
              <h1>Matcha</h1>
            </div>
            <ul className="Nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/listings/display">Listings</Link></li>
            </ul>
          </div>
          
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginWithRouter} />
            <Route exact path="/listings/display" component={ListingsWithRouter} />
          </div>
        </Router>
      </div>
    );
  }
}