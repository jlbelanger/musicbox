import '../../scss/components/Header.scss';
import Import from './buttons/Import';
import Next from './buttons/Next';
import NowPlaying from './NowPlaying';
import PlayPause from './buttons/PlayPause';
import Previous from './buttons/Previous';
import Queue from './Queue';
import React from 'react';
import Shuffle from './buttons/Shuffle';

export default function Header() {
	return (
		<header>
			<section id="controls">
				<Shuffle />
				<Previous />
				<PlayPause />
				<Next />
			</section>
			<NowPlaying />
			<Queue />
			<section id="secondary-controls">
				<Import />
			</section>
		</header>
	);
}
