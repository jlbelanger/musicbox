import md5 from 'md5';

export default (row) => {
	window.api.getData(window.localStorage.getItem('filePath'))
		.then((data) => {
			const auth = data.lastfm;
			if (!auth) {
				return;
			}

			let body = {
				album: row.album || '',
				api_key: auth.apiKey,
				artist: row.artist || '',
				method: 'track.scrobble',
				sk: auth.sk,
				timestamp: Math.round(Date.now() / 1000),
				track: row.title || '',
			};

			const sig = Object.keys(body)
				.map((key) => `${key}${body[key]}`)
				.join('');
			body.api_sig = md5(`${sig}${auth.apiSecret}`);

			body = Object.keys(body)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
				.join('&');

			const postData = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body,
			};

			fetch('https://ws.audioscrobbler.com/2.0?format=json', postData);
		});
};
