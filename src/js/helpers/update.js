export default (id, data) => {
	// Update library JSON file.
	window.api.updateJson(id, data);

	// Update Tabulator data.
	window.musicboxTable.table.updateData([{ ...data, id }]);

	// TODO: Update ID3.
};
