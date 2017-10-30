import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';


const selectJobType = [
    {'value': 'Internship', 'label': 'Internship', 'name': 'jobType'},
    {'value': 'Co-op', 'label': 'Co-op', 'name': 'jobType'},
    {'value': 'Full-Time', 'label': 'Full-Time', 'name': 'jobType'},
];

const selectExpertise = [
    {'value': 'Engineering', 'label': 'Engineering', 'name': 'expertise'},
    {'value': 'Business', 'label': 'Business', 'name': 'expertise'},
    {'value': 'Product', 'label': 'Product', 'name': 'expertise'},
];

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
            jobType: '',
            expertise: ''
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

	handleSelect(option) {
	    this.setState({[option.name]: option.value});
    }

    register() {
	    const options = {
	        method: 'POST',
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
	            email: this.state.email,
                password: this.state.password,
                jobType: this.state.jobType,
                expertise: this.state.expertise
	        })
        };

	    fetch(window.location.origin + '/register', options)
            .then((response) => console.log(response));

	    window.location.reload(true);
    }


	render() {
		return (
			<div className="Register">
				<h1>Register</h1>
                <input
                    onChange={this.handleChange.bind(this)}
                    name="first_name"
                    placeholder="First Name"
                    value={this.state.first_name}
                    type="text"
                />

                <input
                    onChange={this.handleChange.bind(this)}
                    name="last_name"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    type="text"
                />


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

                <Select
                    name="jobType"
                    value={this.state.jobType}
                    placeholder="Job Type"
                    options={selectJobType}
                    onChange={this.handleSelect.bind(this)}
                />

                <Select
                    name="expertise"
                    value={this.state.expertise}
                    placeholder="Expertise"
                    options={selectExpertise}
                    onChange={this.handleSelect.bind(this)}
                />

				<p>Placeholder for Login via LinkedIn</p>

				<button
            className="submitRegister"
            onClick={this.register.bind(this)}
        >Sign Up</button>
				<button className="submitRegister">Sign Up</button>
				<Link to="/login">Have an account? Login here</Link>
			</div>
		);
	}
}

export default Register;