import '../../../scss/components/modals/SongModal.scss';
import { editSong, selectEditSongId } from '../../slices/app';
import { prettyDatetime, prettyTime } from '../../helpers/datetime';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Field from '../inputs/Field';
import TabButton from '../TabButton';
import TabFrame from '../TabFrame';
import Text from '../inputs/Text';
import update from '../../helpers/update';
import { ReactComponent as XIcon } from '../../../svg/x.svg';

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
		update(id, changedValues);
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
		<section className="modal-bg">
			<div className="modal" id="song-modal">
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
						<Field onChange={onChange} name="title" label="Title" value={song.title} />
						<Field onChange={onChange} name="artist" label="Artist" value={song.artist} />
						<Field onChange={onChange} name="albumArtist" label="Album artist" value={song.albumArtist} />
						<Field onChange={onChange} name="album" label="Album" value={song.album} />
						<Field onChange={onChange} name="year" label="Year" size="4" value={song.year} />
						<Field onChange={onChange} name="track" label="Track" value={song.track}>
							<Text name="track" onChange={() => {}} value={song.track} size="4" />
							<span className="of">of</span>
							<Text name="trackCount" onChange={() => {}} value={song.trackCount} size="4" />
						</Field>
						<Field onChange={onChange} name="disc" label="Disc" value={song.disc}>
							<Text name="disc" onChange={() => {}} value={song.disc} size="4" />
							<span className="of">of</span>
							<Text name="discCount" onChange={() => {}} value={song.discCount} size="4" />
						</Field>
						<Field onChange={onChange} name="genre" label="Genre" value={song.genre} />
						<Field onChange={onChange} name="composer" label="Composer" value={song.composer} />
						<Field onChange={onChange} name="grouping" label="Grouping" value={song.grouping} />
						<Field onChange={onChange} name="rating" label="Rating" type="rating" value={song.rating} />
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
						<Field onChange={onChange} name="duration" label="Duration" value={prettyTime(song.duration)} readOnly />
						<Field onChange={onChange} name="startTime" label="Start time" value={song.startTime} />
						<Field onChange={onChange} name="endTime" label="End time" value={song.endTime} />

						<Field onChange={onChange} name="numPlays" label="Plays" value={song.numPlays} readOnly />
						<Field onChange={onChange} name="lastPlayed" label="Last played" value={prettyDatetime(song.lastPlayed)} readOnly />
						<Field onChange={onChange} name="numSkips" label="Skips" value={song.numSkips} readOnly />
						<Field onChange={onChange} name="lastSkipped" label="Last skipped" value={prettyDatetime(song.lastSkipped)} readOnly />
						<Field onChange={onChange} name="dateAdded" label="Added" value={prettyDatetime(song.dateAdded)} readOnly />
					</div>
				</TabFrame>

				<div className="modal__footer">
					<button onClick={onPrevious} type="button">Previous</button>
					<button onClick={onNext} type="button">Next</button>
					<button className="button--primary" onClick={onSave} type="button">Save</button>
				</div>
			</div>
		</section>
	);
}
