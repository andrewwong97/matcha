import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}

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
		// should probably encrypt the password from client side
		const url = window.location.origin + '/v1/login';
		
		const email = this.state.email;
		const password = this.state.password;
		const formData = JSON.stringify({ email, password });

		fetch(url, {method: 'POST', body: formData})
		.then((res) => res.json())
		.then((data) => console.log(data));
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

				<button className="submitLogin" onClick={this.handleLogin.bind(this)}>Submit</button>
				<Link to="/register">Need an account? Register here</Link>
			</div>
		);
	}
}

export default Login;