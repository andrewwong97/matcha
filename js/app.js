import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes';
import Main from './Main';
import Nav from './Nav';

const App = () => (
	<div>
		<Nav />
		<Main />
	</div>
);

ReactDOM.render((
	<AppRouter>
		<App />
	</AppRouter>
), document.getElementById('react-root'));

