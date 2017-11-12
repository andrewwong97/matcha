import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Layout from '../components/layout';

const baseUrl = require('../vars.json').baseUrl;

export default class StudentProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            username: this.props.url.query.profile_id,
            user: null,
        };
    }

    componentDidMount() {
        fetch(`${baseUrl}/v1/getProfile/${this.state.username}`, {method: 'GET'})
            .then((res) => res.json())
            .then((user) => this.setState({ user }));
    }

    renderUserDetails() {
        return this.state.user ?
            <div className="user-details">
                <h1 className="name">
                    {this.state.user.first_name} {this.state.user.last_name}
                    <span className="thin"> ({this.state.username})</span>
                </h1>
                <h1 className="location">Location: {this.state.user.location}</h1>
                <h1 className="looking-for">Looking for: {this.state.user.looking_for}</h1>
            </div> : '';
    }

    render() {
        return (
            <Layout title="StudentProfile">
                <div className="StudentProfile">
                    <div className="logo-placeholder"></div>
                    {this.renderUserDetails()}

                    <BootstrapTable data={ this.state.matches }>
                        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Job Title</TableHeaderColumn>
                        <TableHeaderColumn dataField='company_name'>Company Name</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </Layout>
        )
    }
}