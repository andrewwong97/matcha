import React, {Component} from 'react';
import Link from 'next/link';
import Select from 'react-select';
import Router from '../routes';

const baseUrl = require('../vars.json').baseUrl;

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

// TODO: use react-virtualized & react-virtualized-select to efficiently render 
// large list of 1000 largest cities
const selectCity = [
    {'value': 'San Francisco', 'label': 'San Francisco', 'name': 'city'},
    {'value': 'New York', 'label': 'New York', 'name': 'city'},
    {'value': 'Baltimore', 'label': 'Baltimore', 'name': 'city'},
];

class Register extends Component {
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

    register() {

		const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.email,
            password: this.state.password, // has not yet been implemented in backend yet
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

        fetch(baseUrl + '/v1/createProfile', options)
            .then((response) => console.log(response));

        const email = this.state.email;
        this.setState({email: '', password: '', jobType: '', expertise: '', visaStatus: '', city: '' });

        Router.pushRoute(`/profile/${email}`);
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

				<p>Placeholder for Login via LinkedIn</p>

				<p>Placeholder for Login via GitHub</p>

				<div className="submit-wrapper">
					<button
						className="btn btn-submitRegister"
						onClick={this.register.bind(this)}
					>Sign Up</button>

                    <Link href="/login"><a>Have an account? Login here</a></Link>
				</div>

			</div>
		);
	}
}

export default Register;