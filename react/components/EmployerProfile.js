import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuth from '../util/withAuth';
import AddListing from './AddListing';
import Loading from "./Loading";

const baseUrl = require('../vars.json').baseUrl;

const jobTypes = ['Internship', 'Co-op', 'Full-Time'];

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
        this.saveCell = this.saveCell.bind(this);
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

    saveCell(row, cellName, cellValue) {
       let new_listing = {};
       new_listing.title = row.title;
       if (parseFloat(row.salary)) {
           new_listing.salary = parseFloat(row.salary);
       }

       new_listing.desired_skills = typeof row['desired_skills'] === 'string' ? row['desired_skills'].split(',') : row['desired_skills'];
       new_listing.job_type = typeof row.job_type === 'string' ? [row.job_type] : row.job_type;

       const options = {
            headers: new Headers({"Content-Type": 'application/json'}),
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(new_listing)
        };
       fetch(baseUrl + `/v1/employer/editJob/${row._id}`, options)
            .then(res => res.json())
            .then(data => {
                if (data.reason) {
                    alert('404: ' + data.reason);
                }
            });
    }

    render() {
        if (!this.state.profile) {
            return (
                <Loading title="employer details" />
            );
        }

        const cellEditProp = {
          mode: 'click',
          blurToSave: true,
          afterSaveCell: this.saveCell  // a hook for after saving cell
        };

        return (

            <div className="EmployerProfile">
                <div className="logo-placeholder" />
                {this.renderUserDetails()}

                <button
                    className="btn btn-add-listing"
                    onClick={this.toggleAddListing}
                >{this.state.showAddListing ? 'Finish Adding': 'Add Listing'}</button>
                { this.state.showAddListing ? <AddListing profile={this.state.profile} /> : '' }

                <h1>Matches</h1>
                <BootstrapTable data={ this.state.listings } striped>
                    <TableHeaderColumn dataField='_id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='student_matches'>Student Matches</TableHeaderColumn>
                </BootstrapTable>

                <h1>My Listings <span className="thin grey" style={{fontSize: '14pt'}}>click cell to edit</span></h1>
                <BootstrapTable data={ this.state.listings } cellEdit={cellEditProp} striped>
                    <TableHeaderColumn dataField='_id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='job_type' editable={ { type: 'select', options: { values: jobTypes } } }>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='desired_skills'>Skills</TableHeaderColumn>
                    <TableHeaderColumn dataField='salary'>Salary</TableHeaderColumn>
                </BootstrapTable>

            </div>
        )
    }
}

export default withAuth(EmployerProfile);
