import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Layout from '../components/layout';

const baseUrl = require('../vars.json').baseUrl;

export default class EmployerProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [{id: 1, name: 'Software Engineer', student_name: 'Andrew Wong'}],
            username: this.props.url.query.profile_id,
            profile: null,
        };
    }

    componentDidMount() {
        fetch(`${baseUrl}/v1/getProfile/${this.state.username}`, {method: 'GET'})
            .then((res) => res.json())
            .then((user) => this.setState({ user }));
    }

    renderUserDetails() {
        return this.state.profile ?
            <div className="company-details">
                <h1 className="name">
                    {this.state.profile.company_name}
                    <span className="thin"> ({this.state.username})</span>
                </h1>
            </div> : '';
    }

    render() {
        return (
            <Layout title="Employer Profile">
                <div className="EmployerProfile">
                    <div className="logo-placeholder"></div>
                    {this.renderUserDetails()}

                    <BootstrapTable data={ this.state.matches }>
                        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Job Title</TableHeaderColumn>
                        <TableHeaderColumn dataField='student_name'>Student Name</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </Layout>
        )
    }
}