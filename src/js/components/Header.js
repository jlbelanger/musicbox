import '../../scss/components/Header.scss';
import '../../scss/components/NowPlaying.scss';
import Import from './buttons/Import';
import Next from './buttons/Next';
import PlayPause from './buttons/PlayPause';
import Previous from './buttons/Previous';
import Queue from './Queue';
import React from 'react';
import Shuffle from './buttons/Shuffle';
import Time from './Time';
import Volume from './Volume';

export default function Header() {
	return (
		<header>
			<section id="controls">
				<Shuffle />
				<Previous />
				<PlayPause />
				<Next />
			</section>
			<section id="now-playing">
				<div id="now-playing-placeholder">
					<img alt="" id="now-playing-img" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
				</div>
				<div id="now-playing-title" />
				<div id="now-playing-artist" />
				<Time />
			</section>
			<Queue />
			<section id="secondary-controls">
				<Volume />
				<Import />
			</section>
		</header>
	);
}
