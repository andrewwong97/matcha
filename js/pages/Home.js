import React from 'react';
import Listings from '../components/Listings';
import Hero from '../components/Hero';

export default class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<Hero />
				<Listings />
			</div>
		);
	}
}
