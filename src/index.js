import './scss/index.scss';
import * as serviceWorker from './js/serviceWorker';
import al from './js/observer';
import App from './js/components/App';
import MusicboxTable from './js/MusicboxTable';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerShortcuts from './js/shortcuts';
import store from './js/store';

console.log('2022-10-15'); // eslint-disable-line no-console

if (window.api.hasJson()) {
	window.songs = window.api.getSongs();
	window.musicboxTable = new MusicboxTable(Object.values(window.songs));
} else {
	window.songs = {};
	window.musicboxTable = null;
}

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
registerShortcuts();
