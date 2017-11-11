import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			badLogin: false
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
		const data = {
            username: this.state.email,
            password: this.state.password, // v dangerous, plaintext
        };

        const myHeaders = new Headers({
            "Content-Type": 'application/json'
        });

		const options = {
            method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(data)
        };

        const base = window.location.origin;
        fetch(base + '/v1/login', options)
            .then((response) => {
            	if (response.status == 200) {
            		// if success, redirect to the profile
            		this.setState({ badLogin: false });
            		console.log(response.username);
            		history.push(`/profile/${response.username}`);
            	} else {
            		this.setState({ badLogin: true, email: '', password: '' }); // reset fields
            	}
            });        
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
				<a href={this.getLinkedinURL()}>Login With LinkedIn</a>
				<button className="btn btn-submitLogin" onClick={this.handleLogin.bind(this)}>Submit</button>
				<Link to="/register">Need an account? Register here</Link>

				{ this.state.badLogin == true ? <p style={{'color': '#ed441e'}}>Error: please check that you have correctly entered username and/or password</p> : <p></p> }

			</div>
		);
	}
}

export default Login;