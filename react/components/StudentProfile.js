import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuth from '../util/withAuth';

const baseUrl = require('../vars.json').baseUrl;

class StudentProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            username: this.props.username,
            user: JSON.parse(localStorage.profile)
        };
    }

    componentDidMount() {
        if (localStorage.profile) {
            const user = JSON.parse(localStorage.profile);
            this.setState({ user });
        }
    }

    refreshMatches() {
        fetch(`${baseUrl}/v1/listings/all`, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                let matches = []
                const looking_for = this.state.user ? this.state.user.looking_for.toString().toUpperCase() : 'Internship'.toUpperCase();
                data.map(d => {
                    if (d.job_type.toString().toUpperCase() == looking_for) {
                        matches.push({ id: d._id.$oid, name: d.name, employer: d.employer, job_type: d.job_type });
                    }
                });
                this.setState({matches});
            });
    }

    renderUserDetails() {
        if (this.state.user) {
            return <div className="user-details">
                <h1 className="name">
                    {this.state.user.first_name} {this.state.user.last_name}
                    <span className="thin"> ({this.state.username})</span>
                </h1>
                <h1 className="location">Location: {this.state.user.location}</h1>
                <h1 className="looking-for">Looking for: {this.state.user.looking_for}</h1>
            </div>
        } else {
            return <h1 className="name">
                Loading User Details...
                <span className="thin"> ({this.state.username})</span>
            </h1>
        }
    }

    render() {
        return (
            <div className="StudentProfile">
                { this.renderUserDetails() }
                <button className="btn"
                        onClick={this.refreshMatches.bind(this)}>Refresh Matches</button>

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