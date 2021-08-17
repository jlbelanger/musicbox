export const updateSong = (id, data) => {
	// Update library JSON file.
	window.api.updateJsonSong(id, data);

	// Update Tabulator data.
	window.musicboxTable.table.updateData([{ ...data, id }]);

	// TODO: Update ID3.
};

export const addSkip = (id, date) => {
	window.api.addJsonSkip(id, date);
};

export const addPlay = (id, date) => {
	window.api.addJsonPlay(id, date);
};
