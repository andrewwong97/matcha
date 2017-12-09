import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuth from '../util/withAuth';
import AddListing from './AddListing';

const baseUrl = require('../vars.json').baseUrl;

class EmployerProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            listings: [],
            profile: JSON.parse(localStorage.profile),
            showAddListing: false
        };

        this.getMatches();
        this.renderUserDetails = this.renderUserDetails.bind(this);
        this.toggleAddListing = this.toggleAddListing.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + '/v1/employer/' + this.state.profile.company_name + '/getCurrentJobs', {method: 'GET'})
            .then(res => res.json())
            .then(listings => this.setState({ listings }))
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

    toggleAddListing() {
        this.setState({ showAddListing: !this.state.showAddListing });
    }

    render() {
        return (
            <div className="EmployerProfile">
                <div className="logo-placeholder" />
                {this.renderUserDetails()}

                <button
                    className="btn btn-add-listing"
                    onClick={this.toggleAddListing}
                >{this.state.showAddListing ? 'Hide Add Listing': 'Add Listing'}</button>
                { this.state.showAddListing ? <AddListing profile={this.state.profile} /> : '' }

                <h1>Matches</h1>
                <BootstrapTable data={ this.state.matches }>
                    <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='student_name'>Student Name</TableHeaderColumn>
                </BootstrapTable>

                <h1>Listings</h1>
                <BootstrapTable data={ this.state.listings }>
                    <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='salary'>Salary</TableHeaderColumn>
                </BootstrapTable>

            </div>
        )
    }
}

export default withAuth(EmployerProfile);
