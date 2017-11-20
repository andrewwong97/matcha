import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuth from '../util/withAuth';

const baseUrl = require('../vars.json').baseUrl;

class StudentProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            user: JSON.parse(localStorage.profile)
        };
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
        }

        fetch(baseUrl + '/v1/candidate/' + this.props.username + '/getMatches', options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    matches: JSON.parse(data[0])
                });
            })
            .catch(error => {
                console.log(`Error ${error}`);
            });
    }

    renderUserDetails() {
        if (this.state.user) {
            return <div className="user-details">
                <h1 className="name">
                    {this.state.user.first_name} {this.state.user.last_name}
                    <span className="thin"> ({this.props.username})</span>
                </h1>
                <h1 className="location">Location: {this.state.user.location}</h1>
                <h1 className="looking-for">Looking for: {this.state.user.looking_for[0]}</h1>
            </div>
        } else {
            return <h1 className="name">
                Loading User Details...
                <span className="thin"> ({this.props.username})</span>
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
