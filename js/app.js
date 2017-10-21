import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="App">
				<AppRouter />
				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react-root'));

