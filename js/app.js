import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes';

const App = () => (
	<div className="App">
		<AppRouter />
	</div>
);

ReactDOM.render(<App />, document.getElementById('react-root'));

