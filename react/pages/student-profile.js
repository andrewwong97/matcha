import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Layout from '../components/layout';
import withAuth from '../util/withAuth';

const baseUrl = require('../vars.json').baseUrl;

class StudentProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            username: this.props.url.query.profile_id,
            user: JSON.parse(localStorage.profile)
        };
    }

    componentDidMount() {
        if (localStorage.profile) {
            const user = JSON.parse(localStorage.profile);
            this.setState({ user });
        }
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
            <Layout title="Student Profile">
                <div className="StudentProfile">
                    { this.renderUserDetails() }

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

export default withAuth(StudentProfile);