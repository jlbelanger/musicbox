export const updateSong = (id, data) => {
	// Update library JSON file.
	window.api.updateJsonSong(id, data, window.localStorage.getItem('filePath'));

	// Update Tabulator data.
	window.musicboxTable.table.updateData([{ ...data, id }]);

	// TODO: Update ID3.
};

export const addSkip = (id, date) => {
	window.api.addJsonSkip(id, date, window.localStorage.getItem('filePath'));
};

export const addPlay = (id, date) => {
	window.api.addJsonPlay(id, date, window.localStorage.getItem('filePath'));
};
