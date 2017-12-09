import React, {Component} from 'react';
import Select from 'react-select';

const baseUrl = require('../vars.json').baseUrl;


const selectJobType = [
    {'value': 'Internship', 'label': 'Internship', 'name': 'jobType'},
    {'value': 'Co-op', 'label': 'Co-op', 'name': 'jobType'},
    {'value': 'Full-Time', 'label': 'Full-Time', 'name': 'jobType'},
];

export default class AddListing extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            title: '',
            salary: 0,
            jobType: null
        }
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSelect(option) {
	    this.setState({[option.name]: option.value});
    }

    submitListing() {
        fetch(baseUrl + '/v1/employer/' + this.props.profile.company_name + '/newJob',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": 'application/json'}),
                body: JSON.stringify({
                    title: this.state.title,
                    salary: this.state.salary,
                    job_type: [this.state.jobType]
                })
            })
            .then(res => res.json())
            .then(data => {
                alert('Added listing.');
                this.setState({ title: '', salary: 0 });
            })
    }

    render() {
        return (
            <div className="AddListing">
                <input type="text"
                       name="title"
                       value={this.state.title}
                       placeholder="Listing Name"
                       onChange={this.handleChange}
                />
                <input type="text"
                       name="salary"
                       value={this.state.salary}
                       placeholder="Salary"
                       onChange={this.handleChange}
                />
                <Select
                        name="jobType"
                        value={this.state.jobType}
                        placeholder="Job Type"
                        options={selectJobType}
                        onChange={this.handleSelect}
                    />
                <button
                    className="btn"
                    onClick={this.submitListing.bind(this)}
                >Submit</button>
            </div>
        );
    }
}