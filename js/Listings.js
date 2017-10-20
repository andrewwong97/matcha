import React from 'react';

export default class Listings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: null
		}
	}

	componentDidMount() {
		const base = window.location.origin; // gets localhost:5000 or base url
		console.log(base);
		fetch(base + '/v1/listings/all')
		.then((response) => {
			console.log(response);
			this.setState({listings: response})
		});
	}

	render() {
		return (
			<div>
				<h1>Listings</h1>
				fjdlsfls
			</div>
		);
	}
}
