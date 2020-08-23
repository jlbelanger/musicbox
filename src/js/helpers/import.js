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
					album_artist: getStringProperty(song, 'Album Artist'),
					album: getStringProperty(song, 'Album'),
					year: getStringProperty(song, 'Year'),
					track: getStringProperty(song, 'Track Number'),
					track_count: getStringProperty(song, 'Track Count'),
					disc: getStringProperty(song, 'Disc Number'),
					disc_count: getStringProperty(song, 'Disc Count'),
					genre: getStringProperty(song, 'Genre'),
					rating: parseInt(getStringProperty(song, 'Rating'), 10) / 20,
					composer: getStringProperty(song, 'Composer'),
					grouping: getStringProperty(song, 'Grouping'),
					duration: getStringProperty(song, 'Total Time'),
					start_time: getStringProperty(song, 'Start Time'),
					end_time: getStringProperty(song, 'Stop Time'),
					num_plays: getStringProperty(song, 'Play Count'),
					num_skips: getStringProperty(song, 'Skip Count'),
					last_played: getDateProperty(song, 'Play Date UTC'),
					last_skipped: getDateProperty(song, 'Skip Date'),
					date_added: getDateProperty(song, 'Date Added'),
					path,
				};
				id += 1;
			});
			return output;
		})
);
