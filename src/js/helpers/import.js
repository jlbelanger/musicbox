import plist from 'plist';

const getStringProperty = (data, key, defaultValue = null) => (
	Object.prototype.hasOwnProperty.call(data, key) ? data[key] : defaultValue
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
			const output = {};
			let id = 1;
			Object.values(json.Tracks).forEach((song) => {
				let path = getStringProperty(song, 'Location');
				if (path) {
					path = decodeURI(path.replace('file://', ''));
				}
				output[id] = {
					id,
					checked: !getBoolProperty(song, 'Disabled'),
					title: getStringProperty(song, 'Name'),
					artist: getStringProperty(song, 'Artist'),
					albumArtist: getStringProperty(song, 'Album Artist'),
					album: getStringProperty(song, 'Album'),
					year: getStringProperty(song, 'Year'),
					track: getStringProperty(song, 'Track Number'),
					trackCount: getStringProperty(song, 'Track Count'),
					disc: getStringProperty(song, 'Disc Number'),
					discCount: getStringProperty(song, 'Disc Count'),
					genre: getStringProperty(song, 'Genre'),
					rating: parseInt(getStringProperty(song, 'Rating'), 10) / 20,
					composer: getStringProperty(song, 'Composer'),
					grouping: getStringProperty(song, 'Grouping'),
					duration: getStringProperty(song, 'Total Time', 0),
					startTime: getStringProperty(song, 'Start Time', 0),
					endTime: getStringProperty(song, 'Stop Time', 0),
					numPlays: getStringProperty(song, 'Play Count', 0),
					numSkips: getStringProperty(song, 'Skip Count', 0),
					lastPlayed: getDateProperty(song, 'Play Date UTC'),
					lastSkipped: getDateProperty(song, 'Skip Date'),
					dateAdded: getDateProperty(song, 'Date Added'),
					path,
				};
				id += 1;
			});
			return output;
		})
);
