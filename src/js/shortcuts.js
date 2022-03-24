import { chooseSong } from './slices/app';
import sortRows from './helpers/sort';
import Storage from './helpers/Storage';
import store from './store';

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
	let rows = window.musicboxTable.table.searchData(sort[sort.length - 1].column, 'starts', keySequence.join(''));
	rows = sortRows(rows, sort);
	if (rows.length > 0) {
		window.musicboxTable.table.scrollToRow(rows[0].id, 'top');
		window.musicboxTable.table.deselectRow();
		window.musicboxTable.table.selectRow(rows[0].id);
	}
}

function onKeyup(e) {
	if (e.key === 'Escape') {
		const close = document.getElementById('close');
		if (close) {
			close.click();
		}
	}

	if (document.activeElement.tagName !== 'BODY') {
		return;
	}

	if (e.key === 'Home') {
		const rows = window.musicboxTable.table.rowManager.activeRows;
		window.musicboxTable.table.scrollToRow(rows[0].data.id, 'top');
	} else if (e.key === 'End') {
		const rows = window.musicboxTable.table.rowManager.activeRows;
		const num = window.musicboxTable.table.rowManager.activeRowsCount - 1;
		window.musicboxTable.table.scrollToRow(rows[num].data.id, 'bottom');
	} else if (e.key === 'Enter') {
		const rows = window.musicboxTable.table.getSelectedRows();
		if (rows.length > 0) {
			if (rows[0]._row.data.state) {
				document.getElementById('play-pause').click();
			} else {
				store.dispatch(chooseSong({ currentSongId: rows[0]._row.data.id }));
			}
		}
	}
}

function onPositionKeyup(e) {
	if (e.key === ' ' || e.key === 'Enter') {
		document.getElementById('play-pause').click();
	}
}

export default () => {
	window.addEventListener('keyup', jumpToSong, true);
	window.addEventListener('keyup', onKeyup, true);

	document.getElementById('position-input').addEventListener('keyup', onPositionKeyup, true);
};
