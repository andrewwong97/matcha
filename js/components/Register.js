import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import history from '../history';


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

const selectVisaStatus = [
    {'value': 'Citizen', 'label': 'U.S. citizen or resident', 'name': 'visaStatus'},
    {'value': 'Visa', 'label': 'Require a visa to work in the U.S.', 'name': 'visaStatus'},
];

// TODO: use react-select to render an async loading text area for all cities
const selectCity = [
    {'value': 'San Francisco', 'label': 'San Francisco', 'name': 'city'},
    {'value': 'New York', 'label': 'New York', 'name': 'city'},
    {'value': 'Baltimore', 'label': 'Baltimore', 'name': 'city'},
];

const base = window.location.origin; // gets localhost:5000 or base url

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
            jobType: '',
            expertise: '',
            visaStatus: '',
            city: ''
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

    registerWithLinkedIn() {
	    fetch(base + '/v1/getLinkedinURI')
            .then((res) => res.json())
            .then((data) => window.location.replace(data.uri));
    }

    register() {

		const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.email,
            password: this.state.password,
            linkedin_token: '',
            github_token: '',
            skills: [],
            need_visa: this.state.visaStatus,
            location: this.state.city,
            looking_for: [this.state.jobType],
            job_matches: [],
            favorited_jobs: [],
            expertise: this.state.expertise
        };

        const myHeaders = new Headers({
            "Content-Type": 'application/json'
        });

		const options = {
            method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(data)
        };

        fetch(base + '/v1/createProfile', options)
            .then((response) => response.json());

        this.setState({email: '', password: '', jobType: '', expertise: '', visaStatus: '', city: '' });

        history.push('/');
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
                
                <Select
                    name="visaStatus"
                    value={this.state.visaStatus}
                    placeholder="Visa status"
                    options={selectVisaStatus}
                    onChange={this.handleSelect.bind(this)}
                />

                <Select
                    name="city"
                    value={this.state.city}
                    placeholder="Preferred city"
                    options={selectCity}
                    onChange={this.handleSelect.bind(this)}
                />

                <button className="btn" onClick={this.registerWithLinkedIn}>
                    Login via LinkedIn
                </button>

				<p>Placeholder for Login via GitHub</p>

				<div className="submit-wrapper">
					<button
						className="btn btn-submitRegister"
						onClick={this.register.bind(this)}
					>Sign Up</button>

					<Link to="/login">Have an account? Login here</Link>
				</div>

			</div>
		);
	}
}

export default Register;