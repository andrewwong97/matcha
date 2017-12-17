import React, {Component} from 'react';
import Select from 'react-select';
import {strTransform} from "../util/fieldFormat";

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
            jobType: null,
        }
    }

    componentDidMount() {
         fetch(baseUrl + '/v1/skills/all', {method: 'GET', type: 'cors'})
            .then(res => res.json())
            .then(data => data.map(s => ({label: strTransform(s), value: strTransform(s) })))
            .then(skills => this.setState({ allSkills: skills.sort() }));
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSelect(option) {
	    this.setState({[option.name]: option.value});
    }

    handleSkillSelect(selected_skills) {
        this.setState({ desired_skills: selected_skills.map(i => i.value) });
    }

    submitListing() {
        fetch(baseUrl + '/v1/employer/' + this.props.profile.company_name + '/newJob',
            {
                method: 'POST',
                headers: new Headers({"Content-Type": 'application/json'}),
                body: JSON.stringify({
                    title: this.state.title,
                    salary: this.state.salary,
                    job_type: [this.state.jobType],
                    desired_skills: this.state.desired_skills
                })
            })
            .then(res => res.json())
            .then(data => {
                alert('Added listing.');
                fetch(baseUrl + '/v1/employer/' + data._id + '/computeMatches', { method: 'GET', mode: 'cors' })
                .then(res => res.json())
                    .then(data => data);
                this.setState({ title: '', salary: '' });
            });
    }

    render() {
        return (
            <div className="AddListing">
                <div className="add-listing-control">
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
                 <Select.Creatable
                    name="skills"
                    value={this.state.desired_skills}
                    placeholder="Skills"
                    options={this.state.allSkills}
                    onChange={this.handleSkillSelect.bind(this)}
                    multi={true}
                />
                <Select
                        name="jobType"
                        value={this.state.jobType}
                        placeholder="Job Type"
                        options={selectJobType}
                        onChange={this.handleSelect}
                    />
                </div>
                <button
                    className="btn"
                    onClick={this.submitListing.bind(this)}
                >Submit</button>
            </div>
        );
    }
}