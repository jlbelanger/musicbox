import 'normalize.css/normalize.css';
import './css/tabulator.css';
import './css/index.css';
import './css/utilities/_variables.css';
import * as serviceWorker from './js/serviceWorker.js';
import al from './js/observer.js';
import App from './js/components/App.jsx';
import { createRoot } from 'react-dom/client';
import MusicboxAudio from './js/MusicboxAudio.js';
import MusicboxTable from './js/MusicboxTable.jsx';
import { Provider } from 'react-redux';
import registerShortcuts from './js/shortcuts.js';
import store from './js/store.js';
import { StrictMode } from 'react';

console.log('2026-01-03'); // eslint-disable-line no-console

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

	const root = createRoot(document.getElementById('root'));
	root.render(
		<StrictMode>
			<Provider store={store}>
				<App hasJson={hasJson} />
			</Provider>
		</StrictMode>,
	);

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.register();

	al();
	registerShortcuts();
}

if (window.api) {
	window.api.getData(window.localStorage.getItem('filePath'))
		.then((data) => {
			initApp(data);
		});
} else {
	initApp('');
}
