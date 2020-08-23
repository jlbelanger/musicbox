import sortRows from './helpers/sort';
import Storage from './helpers/Storage';

// Jump to song.
let keySequence = [];
let lastKeyTime = null;

function jumpToSong(e) {
	if (document.activeElement.tagName !== 'BODY' || e.key.length > 1) {
		return;
	}

	const now = new Date().getTime();
	if (now > (lastKeyTime + 1000)) {
		keySequence = [];
	}
	keySequence.push(e.key);
	lastKeyTime = now;

	const sort = Storage.get('tabulator-table-sort');
	let rows = window.musicboxTable.table.searchData(sort[0].column, 'starts', keySequence.join(''));
	rows = sortRows(rows, sort);
	if (rows.length > 0) {
		window.musicboxTable.table.scrollToRow(rows[0].id, 'top');
	}
}

function homeEnd(e) {
	if (e.key === 'Home') {
		const rows = window.musicboxTable.table.rowManager.activeRows;
		window.musicboxTable.table.scrollToRow(rows[0].data.id, 'top');
	} else if (e.key === 'End') {
		const rows = window.musicboxTable.table.rowManager.activeRows;
		const num = window.musicboxTable.table.rowManager.activeRowsCount - 1;
		window.musicboxTable.table.scrollToRow(rows[num].data.id, 'bottom');
	}
}

export default () => {
	window.addEventListener('keyup', jumpToSong, true);
	window.addEventListener('keyup', homeEnd, true);
};
