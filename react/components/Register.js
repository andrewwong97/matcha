import React, {Component} from 'react';
import Link from 'next/link';
import Select from 'react-select';
import Router from 'next/router';
import AuthService from "../util/AuthService";


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

const selectCity = [
    {'value': 'San Francisco', 'label': 'San Francisco', 'name': 'city'},
    {'value': 'New York', 'label': 'New York', 'name': 'city'},
    {'value': 'Baltimore', 'label': 'Baltimore', 'name': 'city'},
];

const auth = new AuthService(baseUrl);

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
      jobType: '',
      expertise: '',
      visaStatus: '',
      city: '',
      skills: [],
      allSkills: []
		}

	}

	componentDidMount() {
	    fetch(baseUrl + '/v1/skills/all', {method: 'GET', type: 'cors'})
            .then(res => res.json())
            .then(data => this.setState({ allSkills: data.map(s => ({label: s, value: s})) }));

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

    handleSkillSelect(skills) {
	    this.setState({ skills })
    }

    registerWithLinkedIn() {
        fetch(baseUrl + '/v1/getLinkedinURI')
            .then((res) => res.json())
            .then((data) => window.location.replace(data.uri));
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
            skills: this.state.skills.map((s) => s.value),
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

        fetch(baseUrl + '/v1/createStudentProfile', options)
            .then((response) => response.json())
            .then((data) => {
                const email = this.state.email;
                this.setState({email: '', password: '', jobType: '', expertise: '', visaStatus: '', city: '' });
                auth.setProfile(data);
                Router.push(`/profile/student/${email}`);
            })
            .catch(error => {
                alert("Error creating account. Please check for duplicate emails.");
                console.log(`Error ${error}`);
            });


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

                <Select
                    name="skills"
                    value={this.state.skills}
                    placeholder="Skills"
                    options={this.state.allSkills}
                    onChange={this.handleSkillSelect.bind(this)}
                    multi={true}
                />


                <div className="social-login">
                     <button className="btn btn-li" onClick={this.registerWithLinkedIn}>
                        Login via LinkedIn
                    </button>

                    <button className="btn">
                        Login via Github Placeholder
                    </button>
                </div>
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