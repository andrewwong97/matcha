import React from 'react';
import {
  BrowserRouter as Router,
  browserHistory,
  Route,
  Link,
  withRouter,
  Switch
} from 'react-router-dom';

import Home from './components/Home';
import Listings from './components/Listings';
import Login from './components/Login';
import Signup from './components/Signup';

export default class AppRouter extends React.Component {
  handle() {
    console.log(this.props.location);
  }

  render() {
    return (
      <div className="AppRouter">
        <Router history={browserHistory}>
          <div>
            <div className="Nav-wrapper">
              <div className="logo">
                <h1>Matcha</h1>
              </div>
              <ul className="Nav" onClick={this.handle.bind(this)}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/listings">Listings</Link></li>
              </ul>
            </div>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/listings" component={Listings} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}