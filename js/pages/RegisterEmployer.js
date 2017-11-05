import React from 'react';

export default class RegisterEmployer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            email: '',
            password: '',
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
            })
        };

        fetch(window.location.origin + '/register', options)
            .then((response) => console.log(response));

        window.location.reload(true);
    }


    render() {
        return (
            <div className="RegisterEmployer">
                <h1>Register</h1>
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
                    onClick={this.register.bind(this)}
                >Sign Up</button>
            </div>
        );
    }
}
