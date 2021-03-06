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
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
	}

	handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

    handle404(reason) {
        this.setState({
			email: '',
			password: '',
		});
        localStorage.clear();
        alert('404: ' + reason);
    }

	handleLogin() {
        auth.login(this.state.email, this.state.password)
			.then(data => {
				// page under pages/, browser url form
				setTimeout(Router.push(`/profile/${data.account_type}/${data.email}`), 1000);
			});
	}

	linkedinLogin() {
        fetch(baseUrl + '/v1/getLinkedinURI')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.reason) {
                    this.handle404(data.reason);
                    return;
                }

                window.location.replace(data.uri);
            });
    }

    handleEnter(event) {
		if (event.key === 'Enter') {
			this.handleLogin();
		}
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
					onKeyPress={this.handleEnter}
				/>
				<div className="social-login">
					<button className="btn btn-li" onClick={this.linkedinLogin}>
                    Login via LinkedIn
                </button>
				<button className="btn btn-submitLogin" onClick={this.handleLogin}>Submit</button>
				</div>
				<div className="extra-wrapper">
					<Link href="/register"><a>Need an account? Register here</a></Link>
				</div>
			</div>
		);
	}
}

export default Login;
