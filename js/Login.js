import React from 'react';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	handleLogin(e) {
		// should probably encrypt the password from client side
		const url = window.location.origin + '/login';
		const email = e.target.email;
		const pass = e.target.password;
		const formData = JSON.stringify({ email, pass });
		fetch(url, {
			method: 'POST',
			body: formData
		});
		console.log(formData);

	}

	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleLogin.bind(this)}>
					<input name="email" placeholder="Email" type="text" />
					<input name="password" placeholder="Password" type="password" />
					<input type="submit" value="Login" />
				</form>
			</div>
		);
	}
}
