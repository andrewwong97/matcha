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
            isEditing: false
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

    toggleEditing() {
        this.setState({isEditing: !this.state.isEditing});
    }

    renderUserDetailsEditing() {
        return (
            <div className="company-details">
                <h1 className="name">
                    {this.state.profile.company_name}
                    <span style={{fontSize: "16pt"}} className="thin"> ({this.props.username})</span>
                </h1>
            </div>
        )
    }

    renderUserDetails() {
        if (this.state.isEditing) {
            return this.renderUserDetailsEditing();
        }

        return (
            <div className="company-details">
                <h1 className="name">
                    {this.state.profile.company_name}
                    <span className="thin"> ({this.props.username})</span>
                </h1>
            </div>
        )
    }

    render() {
        if (!this.state.profile) {
            return (
                <h1 className="user-details">
                    Loading User Details...
                    <div className="loading-pulse" />
                </h1>
            );
        }

        return (
            <div className="EmployerProfile">
                <button
                    className="btn"
                    style={{float: "right"}}
                    onClick={this.toggleEditing.bind(this)}
                >
                    {this.state.isEditing ? 'Done editing' : 'Edit profile'}
                </button>
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
