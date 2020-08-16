import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import al from './js/observer';
import App from './js/components/App';
import store from './js/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './js/serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

al();
