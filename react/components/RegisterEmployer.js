import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../util/AuthService';

const baseUrl = require('../vars.json').baseUrl;
const auth = new AuthService(baseUrl);


export default class RegisterEmployer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            email: '',
            password: '',
        };

        this.register = this.register.bind(this);
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

    handle404(reason) {
        alert("404: " + reason);
    }

    register() {
        const options = {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                company_name: this.state.company_name,
                email: this.state.email,
                password: this.state.password,
            })
        };

        fetch(baseUrl + '/v1/createEmployerProfile', options)
            .then(response => response.json())
            .then(data => {
                if (data.reason) {
                    this.handle404(data.reason);
                    return;
                }

                const email = this.state.email;
                this.setState({ company_name: '', email: '', password: '' });
                auth.setProfile(data);
                Router.push(`/profile/employer/${email}`);
            });
    }


    render() {
        return (
            <div className="RegisterEmployer">
                <h1>Register Employer</h1>
                <input
                    onChange={this.handleChange.bind(this)}
                    name="company_name"
                    placeholder="Company Name"
                    value={this.state.company_name}
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

                <button
                    className="btn btn-submitRegister"
                    onClick={this.register}
                >Sign Up</button>
            </div>
        );
    }
}
