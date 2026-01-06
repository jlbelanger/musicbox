import '../../css/components/Header.css';
import '../../css/components/NowPlaying.css';
import Next from './buttons/Next.jsx';
import PlayPause from './buttons/PlayPause.jsx';
import Previous from './buttons/Previous.jsx';
import Queue from './buttons/Queue.jsx';
import Search from './buttons/Search.jsx';
import Shuffle from './buttons/Shuffle.jsx';
import Time from './Time.jsx';
import Volume from './Volume.jsx';

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
