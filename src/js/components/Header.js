import '../../css/components/Header.css';
import '../../css/components/NowPlaying.css';
import Next from './buttons/Next';
import PlayPause from './buttons/PlayPause';
import Previous from './buttons/Previous';
import Queue from './buttons/Queue';
import React from 'react';
import Search from './buttons/Search';
import Shuffle from './buttons/Shuffle';
import Time from './Time';
import Volume from './Volume';

export default function Header() {
	return (
		<header>
			<section id="controls">
				<Previous />
				<PlayPause />
				<Next />
			</section>
			<section id="now-playing">
				<div id="now-playing-placeholder">
					<img alt="" id="now-playing-img" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
				</div>
				<div id="now-playing-info" style={{ display: 'none' }}>
					<div id="now-playing-title" />
					<div id="now-playing-artist" />
					<Time />
				</div>
			</section>
			<section id="secondary-controls">
				<Search />
				<Shuffle />
				<Queue />
				<Volume />
			</section>
		</header>
	);
}
