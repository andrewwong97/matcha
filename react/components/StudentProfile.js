import React from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuth from '../util/withAuth';

const baseUrl = require('../vars.json').baseUrl;

class StudentProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            user: JSON.parse(localStorage.profile),
            username: Router.asPath.slice(Router.asPath.indexOf('student/')+8),
            showSkills: false,
            isEditing: false
        };

        this.toggleSkills = this.toggleSkills.bind(this);
    }

    componentDidMount() {
        if (localStorage.profile) {
            const user = JSON.parse(localStorage.profile);
            this.setState({ user });
        }
        this.getMatches()
    }

    getMatches() {
        const options = {
            method: 'GET',
            mode: 'cors'
        }

        fetch(baseUrl + '/v1/candidate/' + this.state.username + '/getMatches', options)
            .then((response) => response.json())
            .then((matches) => {
                this.setState({ matches });
            })
            .catch(error => {
                console.log(`Error ${error}`);
            });
    }

    updateUserProfile(profile) {
        fetch(
            baseUrl + '/v1/editStudentProfile/' + this.state.username,
            {
                method: 'POST',
                headers: new Headers({"Content-Type": 'application/json'}),
                body: JSON.stringify(profile),
                mode: 'cors'
            })
            .then(response => response.json())
            .then((user_profile) => {
                this.setState({user: user_profile});
                user_profile['account_type'] = 'student';
                localStorage.setItem('profile', JSON.stringify(user_profile));
            })
            .catch(error => {
                console.log(`Error ${error}`);
            });
    }

    toggleSkills() {
        this.setState({showSkills: !this.state.showSkills});
    }

    toggleEditing() {
        if (this.state.isEditing) {
            this.updateUserProfile(this.state.user)
        }
        this.setState({isEditing: !this.state.isEditing});
    }

    handleLocationChange(event) {
        this.state.user.location = event.target.value
        this.setState({user: this.state.user});
    }

    handleLookingChange(event) {
        this.state.user.looking_for = event.target.value.split(', ')
        this.setState({user: this.state.user});
    }

    handleSkillsChange(event) {
        this.state.user.skills = event.target.value.split(', ')
        this.setState({user: this.state.user});
    }

    renderUserDetailsEditing() {
        return (
            <div className="user-details">
                <h1 className="name">{this.state.user.first_name} {this.state.user.last_name}</h1>
                <h1 className="subtitle">{this.state.username}</h1>

                <h1 className="location">
                    <input placeholder="Location..." type="text" value={this.state.user.location} onChange={this.handleLocationChange.bind(this)} />
                </h1>
                <h1 className="looking-for">
                    Looking for:
                    <input placeholder="Job type..." type="text" value={this.state.user.looking_for.length > 1? this.state.user.looking_for.join(', ') : this.state.user.looking_for[0]} onChange={this.handleLookingChange.bind(this)} />
                </h1>
                <h1 className="skills">
                    Skills:
                    <input placeholder="Add skills (comma separated)..." type="text" value={this.state.user.skills.length > 1? this.state.user.skills.join(', ') : this.state.user.skills[0]} onChange={this.handleSkillsChange.bind(this)} />
                </h1>
            </div>
        )
    }

    renderUserDetails() {
        if (this.state.isEditing) {
            return this.renderUserDetailsEditing();
        }

        return (
            <div className="user-details">
                <h1 className="name">{this.state.user.first_name} {this.state.user.last_name}</h1>
                <h1 className="subtitle">{this.state.username}</h1>
                <h1 className="location">{this.state.user.location || "Add a location..."}</h1>
                <h1 className="looking-for">Looking for: {this.state.user.looking_for ? this.state.user.looking_for.join(', ') : ''}</h1>
                <h1 className="skills">
                    Skills: {this.state.showSkills ? (
                        this.state.user.skills ? this.state.user.skills.join(', '): 'Add skills...'
                    ) : (
                        <span style={{cursor: "pointer", color: '#cccccc'}} onClick={this.toggleSkills}> show skills... </span>
                    )}
                </h1>
            </div>
        )
    }

    render() {
        if (!this.state.user) {
            return (
                <h1 className="user-details">
                    Loading User Details...
                    <div className="loading-pulse" />
                </h1>
            );
        }

        return (
            <div className="StudentProfile">
                <button
                    className="btn"
                    style={{float: "right"}}
                    onClick={this.toggleEditing.bind(this)}
                >
                    {this.state.isEditing ? 'Done editing' : 'Edit profile'}
                </button>
                { this.renderUserDetails() }

                <BootstrapTable data={ this.state.matches }>
                    <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='employer'>Company Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='job_type'>Job Type</TableHeaderColumn>
                </BootstrapTable>
                <span style={{cursor: "pointer"}} onClick={this.getMatches.bind(this)}>Refresh Matches</span>
            </div>
        )
    }
}

export default withAuth(StudentProfile);
