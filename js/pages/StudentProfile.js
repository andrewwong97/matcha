import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class StudentProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            matches: []
        };
    }

    componentDidMount() {
        const base = window.location.origin; // gets localhost:5000 or base url
        fetch(base + '/v1/listings/all', {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            const matches = data.map((m) => (
                {id: Math.floor(Math.random() * 1000), title: {m}.name, company_name: 'Company Name'}
            ));
            this.setState({matches});
        });
    }

    render() {
        return (
            <div className="StudentProfile">
                <div className="logo-placeholder"></div>
                <h1>{this.props.first_name} {this.props.last_name}</h1>
                <h1>First Name, Last Name</h1>
                <h3>{this.props.match.params.profile_id}</h3>

                <BootstrapTable data={ this.state.matches }>
                    <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Job Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='company_name'>Company Name</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}