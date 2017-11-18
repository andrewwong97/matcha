import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import AuthService from '../util/AuthService';

const baseUrl = require('../vars.json').baseUrl;
const auth = new AuthService(baseUrl);

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			badLogin: false
		};

		this.handleLogin.bind(this);
	}

	handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

	handleLogin() {
        auth.login(this.state.email, this.state.password)
			.then(data => {
				// page under pages/, browser url form
				Router.push('/student-profile', `/profile/${this.state.email}`);
			});
	}

	linkedinLogin() {
        fetch(baseUrl + '/v1/getLinkedinURI')
            .then((res) => res.json())
            .then((data) => window.location.replace(data.uri));
    }

	render() {
		return (
			<div className="Login">
				<h1>Login</h1>
				<input 
					onChange={this.handleChange.bind(this)} 
					name="email" 
					placeholder="Email" 
					value={this.state.email} 
					type="text" 
				/>

				<input 
					onChange={this.handleChange.bind(this)} 
					name="password" 
					placeholder="Password" 
					value={this.state.password}
					type="password" 
				/>
				<button className="btn" onClick={this.linkedinLogin}>
                    Login via LinkedIn
                </button>
				<button className="btn btn-submitLogin" onClick={this.handleLogin.bind(this)}>Submit</button>
				<Link href="/register"><a>Need an account? Register here</a></Link>

				{ this.state.badLogin == true ? <p style={{'color': '#ed441e'}}>Error: please check that you have correctly entered username and/or password</p> : <p></p> }

			</div>
		);
	}
}

export default Login;