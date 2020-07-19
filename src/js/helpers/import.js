import plist from 'plist';

const getStringProperty = (data, key) => (
	Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null
);

const getDateProperty = (data, key) => (
	Object.prototype.hasOwnProperty.call(data, key) ? data[key].toISOString() : null
);

const getBoolProperty = (data, key) => (
	Object.prototype.hasOwnProperty.call(data, key)
);

export default (file) => (
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = () => {
			reject(reader.error);
		};
		reader.readAsText(file);
	})
		.then((xml) => {
			const json = plist.parse(xml);
			const output = [];
			Object.values(json.Tracks).forEach((song) => {
				output.push({
					id: getStringProperty(song, 'Track ID'),
					checked: !getBoolProperty(song, 'Disabled'),
					title: getStringProperty(song, 'Name'),
					artist: getStringProperty(song, 'Artist'),
					album: getStringProperty(song, 'Album'),
					year: getStringProperty(song, 'Year'),
					genre: getStringProperty(song, 'Genre'),
					rating: getStringProperty(song, 'Rating'),
					last_played: getDateProperty(song, 'Play Date UTC'),
					date_added: getDateProperty(song, 'Date Added'),
					path: getStringProperty(song, 'Location'),
				});
			});
			return output;
		})
);
