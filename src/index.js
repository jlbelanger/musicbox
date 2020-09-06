import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import al from './js/observer';
import App from './js/components/App';
import store from './js/store';
import { Provider } from 'react-redux';
import registerShortcuts from './js/shortcuts';
import * as serviceWorker from './js/serviceWorker';
import MusicboxTable from './js/MusicboxTable';

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
