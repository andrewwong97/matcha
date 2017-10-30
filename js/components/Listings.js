import React from 'react';

class Listings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: null
		}
	}

	renderListings() {
		return this.state.listings == null ? 'Loading listings...' : 
			this.state.listings.map((listing) => <li>{listing.name} {listing.salary}</li>);
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
			<div>
				<h1>Listings</h1>
				{this.renderListings()}
			</div>
		);
	}
}

export default Listings;
