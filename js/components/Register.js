import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

	render() {
		return (
			<div className="Register">
				<h1>Register</h1>
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

				<p>Placeholder for Login via LinkedIn</p>

				<button className="submitRegister">Sign Up</button>
			</div>
		);
	}
}

export default Register;