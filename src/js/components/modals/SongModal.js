import React, { useState } from 'react';
import { editSong } from '../../slices/app';
import PropTypes from 'prop-types';
import Text from '../inputs/Text';
import update from '../../helpers/update';
import { useDispatch } from 'react-redux';
import { ReactComponent as XIcon } from '../../../svg/x.svg';

export default function SongModal({ id }) {
	const dispatch = useDispatch();
	const [tab, setTab] = useState('info');
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
	return (
		<section className="modal-bg">
			<div className="modal" id="song-modal">
				<button className="icon" onClick={onClose} type="button">
					<XIcon />
					Close
				</button>
				<ul className="tabs">
					<li>
						<button data-tab="info" onClick={onClickTab} type="button">Info</button>
					</li>
					<li>
						<button data-tab="artwork" onClick={onClickTab} type="button">Artwork</button>
					</li>
					<li>
						<button data-tab="lyrics" onClick={onClickTab} type="button">Lyrics</button>
					</li>
					<li>
						<button data-tab="extra" onClick={onClickTab} type="button">Extra</button>
					</li>
				</ul>
				{tab === 'info' ? (
					<div className="fields">
						<Text onChange={onChange} name="title" label="Title" value={song.title} />
						<Text onChange={onChange} name="artist" label="Artist" value={song.artist} />
						<Text onChange={onChange} name="albumArtist" label="Album artist" value={song.albumArtist} />
						<Text onChange={onChange} name="album" label="Album" value={song.album} />
						<Text onChange={onChange} name="year" label="Year" size="4" value={song.year} />
						<Text onChange={onChange} name="track" label="Track" value={song.track} size="4" />
						<Text onChange={onChange} name="trackCount" label="Track count" value={song.trackCount} size="4" />
						<Text onChange={onChange} name="disc" label="Disc" value={song.disc} size="4" />
						<Text onChange={onChange} name="discCount" label="Disc count" value={song.discCount} size="4" />
						<Text onChange={onChange} name="genre" label="Genre" value={song.genre} />
						<Text onChange={onChange} name="composer" label="Composer" value={song.composer} />
						<Text onChange={onChange} name="grouping" label="Grouping" value={song.grouping} />
						<Text onChange={onChange} name="rating" label="Rating" value={song.rating} />
					</div>
				) : null}
				{tab === 'artwork' ? (
					<div className="fields">
						TODO
					</div>
				) : null}
				{tab === 'lyrics' ? (
					<div className="fields">
						TODO
					</div>
				) : null}
				{tab === 'extra' ? (
					<div className="fields">
						<Text onChange={onChange} name="duration" label="Duration" value={song.duration} readOnly />
						<Text onChange={onChange} name="startTime" label="Start time" value={song.startTime} />
						<Text onChange={onChange} name="endTime" label="End time" value={song.endTime} />

						<Text onChange={onChange} name="numPlays" label="Plays" value={song.numPlays} readOnly />
						<Text onChange={onChange} name="lastPlayed" label="Last played" value={song.lastPlayed} readOnly />
						<Text onChange={onChange} name="numSkips" label="Skips" value={song.numSkips} readOnly />
						<Text onChange={onChange} name="lastSkipped" label="Last skipped" value={song.lastSkipped} readOnly />
						<Text onChange={onChange} name="dateAdded" label="Added" value={song.dateAdded} readOnly />
					</div>
				) : null}
				<button onClick={onSave} type="button">Save</button>
			</div>
		</section>
	);
}

SongModal.propTypes = {
	id: PropTypes.string.isRequired,
};
