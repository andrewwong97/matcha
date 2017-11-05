import React from 'react';
import {
  Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Home from './pages/Home';
import Listings from './components/Listings';
import Login from './components/Login';
import Register from './components/Register';
import RegisterEmployer from './pages/RegisterEmployer';

import history from './history';

export default class AppRouter extends React.Component {
  handle() {
    console.log(this.props.location);
  }

  render() {
    return (
      <div className="AppRouter">
        <Router history={history}>
          <div>
            <div className="Nav-wrapper">
              <div className="logo">
                <h1>Matcha</h1>
              </div>
              <ul className="Nav" onClick={this.handle.bind(this)}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/listings" component={Listings} />
              <Route path="/register" component={Register} />
              <Route path="/register-employer" component={RegisterEmployer} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}