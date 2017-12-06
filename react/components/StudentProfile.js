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
            skills: [],
            matches: [],
            user: JSON.parse(localStorage.profile),
            username: Router.asPath.slice(Router.asPath.indexOf('student/')+8),
            showSkills: false
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
            type: 'cors'
        }

        fetch(baseUrl + '/v1/candidate/' + this.state.username + '/getMatches', options)
            .then((response) => response.json())
            .then((matches) => {
                console.log(matches);
                this.setState({ matches });
            })
            .catch(error => {
                console.log(`Error ${error}`);
            });
    }

    toggleSkills() {
        this.setState({ showSkills: !this.state.showSkills });
    }

    renderUserDetails() {
        const skillsClass = classNames('skills', {hide: !this.state.showSkills});
        if (this.state.user) {
            return <div className="user-details">
                <h1 className="name">
                    {this.state.user.first_name} {this.state.user.last_name}
                    <span className="thin"> ({this.state.username})</span>
                </h1>
                <h1 className="location">Location: {this.state.user.location}</h1>
                <button className="btn btn-show-skills" onClick={this.toggleSkills}>{this.state.showSkills ? 'Hide Skills': 'Show Skills'}</button>
                <h1 className={skillsClass}>Skills: {this.state.user.skills ? this.state.user.skills.join(', '): 'No skills found'}</h1>
                <h1 className="looking-for">Looking for: {this.state.user.looking_for.join(', ')}</h1>
            </div>
        } else {
            return <h1 className="user-details">
                Loading User Details...
                <div className="loading-pulse" />
            </h1>
        }
    }

    render() {
        return (
            <div className="StudentProfile">
                { this.renderUserDetails() }
                <button className="btn"
                        onClick={this.getMatches.bind(this)}>Refresh Matches</button>

                <BootstrapTable data={ this.state.matches }>
                    <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='employer'>Company Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='job_type'>Job Type</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default withAuth(StudentProfile);
