import React, {Component} from 'react';
import classNames from 'classnames';
import Select from 'react-select';


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
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSelect(option) {
	    this.setState({[option.name]: option.value});
    }

    render() {
        return (
            <div className="AddListing">
            <input type="text"
                   name="listing-name"
                   placeholder="Listing Name"
                   onChange={this.handleChange}
            />
            <input type="text"
                   name="listing-salary"
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
            <button className="btn">Submit</button>
        </div>
        );
    }
}