import QueueIcon from '../../../svg/queue.svg?react'; // eslint-disable-line import/no-unresolved
import QueueList from '../QueueList.jsx';
import { useState } from 'react';

export default function Queue() {
	const [showQueue, setShowQueue] = useState(false);
	const onClick = () => {
		setShowQueue(!showQueue);
	};

	return (
		<>
			<button
				className={`icon${showQueue ? ' active' : ''}`}
				id="toggle-queue"
				onClick={onClick}
				title="Toggle queue"
				type="button"
			>
				<QueueIcon />
				Toggle queue
			</button>
			<QueueList className={showQueue ? 'enter' : ''} />
		</>
	);
}
