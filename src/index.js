import './scss/index.scss';
import * as serviceWorker from './js/serviceWorker';
import al from './js/observer';
import App from './js/components/App';
import MusicboxAudio from './js/MusicboxAudio';
import MusicboxTable from './js/MusicboxTable';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import registerShortcuts from './js/shortcuts';
import store from './js/store';

console.log('2022-12-24'); // eslint-disable-line no-console

function initApp(data) {
	let hasJson = false;
	if (data) {
		hasJson = true;
		window.songs = data.songs;
		window.musicboxTable = new MusicboxTable(Object.values(window.songs));
	} else {
		window.songs = {};
		window.musicboxTable = null;
	}
	window.audio = new MusicboxAudio();

	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<App hasJson={hasJson} />
			</Provider>
		</React.StrictMode>
	);

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.register();

	al();
	registerShortcuts();
}

if (window.api) {
	window.api.getData()
		.then((data) => {
			initApp(data);
		});
} else {
	initApp('');
}
