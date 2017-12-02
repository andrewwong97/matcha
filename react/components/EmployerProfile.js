import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuth from '../util/withAuth';

const baseUrl = require('../vars.json').baseUrl;

class EmployerProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            profile: null,
        };

        this.getMatches()
    }

    componentDidMount() {
        fetch(`${baseUrl}/v1/getProfile/${this.props.username}`, {method: 'GET'})
            .then((res) => res.json())
            .then((user) => this.setState({ user }));
    }

    getMatches() {
        // Get employer/job matches
    }

    renderUserDetails() {
        return this.state.profile ?
            <div className="company-details">
                <h1 className="name">
                    {this.state.profile.company_name}
                    <span className="thin"> ({this.props.username})</span>
                </h1>
            </div> : '';
    }

    render() {
        return (
            <div className="EmployerProfile">
                <div className="logo-placeholder"></div>
                {this.renderUserDetails()}

                <BootstrapTable data={ this.state.matches }>
                    <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='student_name'>Student Name</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default withAuth(EmployerProfile);
