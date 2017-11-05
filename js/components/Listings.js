import React from 'react';

class Listings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: []
		}
	}

	renderListings() {
		return this.state.listings == null ? 'Loading listings...' :
			this.state.listings.map((listing) =>
				(
					<li className="job-listing">
						<div className="logo-placeholder"></div>
						<div className="listing-text">
							<p className="company">Company Name</p>
							<p className="name">{listing.name}</p>
							<p className="salary">{listing.salary}</p>
						</div>
					</li>
				)
			);
	}

	componentDidMount() {
		const base = window.location.origin; // gets localhost:5000 or base url
		fetch(base + '/v1/listings/all', {method: 'GET'})
		.then((response) => response.json())
		.then((data) => {
			this.setState({listings: data});
		});
	}

	render() {
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

export default Listings;
