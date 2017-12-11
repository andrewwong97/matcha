import React, { Component } from 'react';
import Loading from './Loading';
import withAuth from '../util/withAuth';

const baseUrl = require('../vars.json').baseUrl;

class Listings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: []
		}
	}

	renderListings() {
		return !this.state.listings ?
			<div className="loader"><h1 className="thin">Loading listings...</h1><div className="loading-pulse" /></div> :
			this.state.listings.map((listing) =>
				(
					<li className="job-listing">
						<div className="logo-placeholder" />
						<div className="listing-text">
							<p className="company">{listing.employer}</p>
							<p className="name">{listing.title}</p>
							<p className="salary">Salary: {listing.salary}</p>
						</div>
					</li>
				)
			);
	}

	componentDidMount() {
		fetch(baseUrl + '/v1/listings/all', {method: 'GET'})
		.then((response) => response.json())
		.then((data) => {
			this.setState({listings: data});
		});
	}

	render() {
		if (this.state.listings.length === 0) {
			return (
				<Loading title="listings"/>
			)
		}
		return (
			<div className="Listings">
				<h1>Listings</h1>
				<div className="listing-container">
                    {this.renderListings()}
				</div>
			</div>
		);
	}
}

export default withAuth(Listings);
