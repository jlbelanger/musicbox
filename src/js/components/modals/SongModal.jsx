import '../../../css/components/modals/SongModal.css';
import { editSong, selectEditSongId } from '../../slices/app.js';
import { prettyDatetime, prettyTime } from '../../helpers/datetime.js';
import { useDispatch, useSelector } from 'react-redux';
import Field from '../inputs/Field.jsx';
import Modal from '../Modal.jsx';
import TabButton from '../TabButton.jsx';
import TabFrame from '../TabFrame.jsx';
import Text from '../inputs/Text.jsx';
import { updateSong } from '../../helpers/update.js';
import { useState } from 'react';
import XIcon from '../../../svg/x.svg?react'; // eslint-disable-line import/no-unresolved

export default function SongModal() {
	const dispatch = useDispatch();
	const id = useSelector(selectEditSongId);
	const [tab, setTab] = useState('Info');
	const [song, setSong] = useState(window.songs[id]);
	const [changedValues, setChangedValues] = useState({});
	const onClose = () => {
		dispatch(editSong({ id: null }));
	};
	const onClickTab = (e) => {
		setTab(e.target.getAttribute('data-tab'));
	};
	const onChange = (name, value) => {
		setSong({ ...song, [name]: value });
		setChangedValues({ ...changedValues, [name]: value });
	};
	const onSave = () => {
		updateSong(id, changedValues);
		onClose();
	};
	const onNext = () => {
		const elem = document.querySelector('.tabulator-selected').nextSibling;
		window.musicboxTable.table.deselectRow();
		window.musicboxTable.table.selectRow(elem);
		const newId = window.musicboxTable.table.getSelectedRows()[0]._row.data.id;
		setSong(window.songs[newId]);
		dispatch(editSong({ id: newId }));
	};
	const onPrevious = () => {
		const elem = document.querySelector('.tabulator-selected').previousSibling;
		window.musicboxTable.table.deselectRow();
		window.musicboxTable.table.selectRow(elem);
		const newId = window.musicboxTable.table.getSelectedRows()[0]._row.data.id;
		setSong(window.songs[newId]);
		dispatch(editSong({ id: newId }));
	};

	return (
		<Modal id="song-modal" onClickCancel={onClose}>
			<button className="icon" id="close" onClick={onClose} type="button">
				<XIcon />
				Close
			</button>

			<ul className="tabs">
				<TabButton label="Info" onClick={onClickTab} tab={tab} />
				<TabButton label="Artwork" onClick={onClickTab} tab={tab} />
				<TabButton label="Lyrics" onClick={onClickTab} tab={tab} />
				<TabButton label="Extra" onClick={onClickTab} tab={tab} />
			</ul>

			<TabFrame label="Info" tab={tab}>
				<div className="fields">
					<Field label="Title" name="title" onChange={onChange} value={song.title} />
					<Field label="Artist" name="artist" onChange={onChange} value={song.artist} />
					<Field label="Album artist" name="albumArtist" onChange={onChange} value={song.albumArtist} />
					<Field label="Album" name="album" onChange={onChange} value={song.album} />
					<Field label="Year" name="year" onChange={onChange} size="4" value={song.year} />
					<Field label="Track" name="track" onChange={onChange} value={song.track}>
						<Text name="track" onChange={() => {}} size="4" value={song.track} />
						<span className="of">of</span>
						<Text name="trackCount" onChange={() => {}} size="4" value={song.trackCount} />
					</Field>
					<Field label="Disc" name="disc" onChange={onChange} value={song.disc}>
						<Text name="disc" onChange={() => {}} size="4" value={song.disc} />
						<span className="of">of</span>
						<Text name="discCount" onChange={() => {}} size="4" value={song.discCount} />
					</Field>
					<Field label="Genre" name="genre" onChange={onChange} value={song.genre} />
					<Field label="Composer" name="composer" onChange={onChange} value={song.composer} />
					<Field label="Grouping" name="grouping" onChange={onChange} value={song.grouping} />
					<Field label="Rating" name="rating" onChange={onChange} type="rating" value={song.rating} />
				</div>
			</TabFrame>

			<TabFrame label="Artwork" tab={tab}>
				<div className="fields">
					TODO
				</div>
			</TabFrame>

			<TabFrame label="Lyrics" tab={tab}>
				<div className="fields">
					TODO
				</div>
			</TabFrame>

			<TabFrame label="Extra" tab={tab}>
				<div className="fields">
					<Field label="Duration" name="duration" onChange={onChange} readOnly value={prettyTime(song.duration)} />
					<Field label="Start time" name="startTime" onChange={onChange} value={song.startTime} />
					<Field label="End time" name="endTime" onChange={onChange} value={song.endTime} />

					<Field label="Plays" name="numPlays" onChange={onChange} readOnly value={song.numPlays} />
					<Field label="Last played" name="lastPlayed" onChange={onChange} readOnly value={prettyDatetime(song.lastPlayed)} />
					<Field label="Skips" name="numSkips" onChange={onChange} readOnly value={song.numSkips} />
					<Field label="Last skipped" name="lastSkipped" onChange={onChange} readOnly value={prettyDatetime(song.lastSkipped)} />
					<Field label="Added" name="dateAdded" onChange={onChange} readOnly value={prettyDatetime(song.dateAdded)} />
				</div>
			</TabFrame>

			<div className="modal__footer">
				<button onClick={onPrevious} type="button">Previous</button>
				<button onClick={onNext} type="button">Next</button>
				<button className="button--primary" onClick={onSave} type="button">Save</button>
			</div>
		</Modal>
	);
}
