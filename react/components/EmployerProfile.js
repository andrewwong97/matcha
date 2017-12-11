import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuth from '../util/withAuth';
import AddListing from './AddListing';
import Loading from "./Loading";

const baseUrl = require('../vars.json').baseUrl;

class EmployerProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            listings: [],
            profile: JSON.parse(localStorage.profile),
            showAddListing: false,
            isEditing: false
        };

        this.renderUserDetails = this.renderUserDetails.bind(this);
        this.toggleAddListing = this.toggleAddListing.bind(this);
        this.updateListings = this.updateListings.bind(this);
    }

    componentDidMount() {
        this.updateListings();
    }

    updateListings() {
        fetch(baseUrl + '/v1/employer/' + this.state.profile.company_name + '/getCurrentJobs', {method: 'GET'})
            .then(res => res.json())
            .then(listings => this.setState({ listings }))
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

    toggleAddListing() {
        this.setState({ showAddListing: !this.state.showAddListing });
        this.updateListings();
    }

    render() {
        if (!this.state.profile) {
            return (
                <Loading title="User Details" />
            );
        }

        return (

            <div className="EmployerProfile">
                {/*<button*/}
                    {/*className="btn"*/}
                    {/*style={{float: "right"}}*/}
                    {/*onClick={this.toggleEditing.bind(this)}*/}
                {/*>*/}
                    {/*{this.state.isEditing ? 'Done editing' : 'Edit profile'}*/}
                {/*</button>*/}
                <div className="logo-placeholder" />
                {this.renderUserDetails()}

                <button
                    className="btn btn-add-listing"
                    onClick={this.toggleAddListing}
                >{this.state.showAddListing ? 'Finish Adding': 'Add Listing'}</button>
                { this.state.showAddListing ? <AddListing profile={this.state.profile} /> : '' }

                <h1>Matches</h1>
                <BootstrapTable data={ this.state.listings }>
                    <TableHeaderColumn dataField='_id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='student_matches'>Student Matches</TableHeaderColumn>
                </BootstrapTable>

                <h1>Listings</h1>
                <BootstrapTable data={ this.state.listings }>
                    <TableHeaderColumn dataField='_id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='desired_skills'>Skills</TableHeaderColumn>
                    <TableHeaderColumn dataField='salary'>Salary</TableHeaderColumn>
                </BootstrapTable>

            </div>
        )
    }
}

export default withAuth(EmployerProfile);
