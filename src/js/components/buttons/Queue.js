import React, { useState } from 'react';
import { ReactComponent as QueueIcon } from '../../../svg/queue.svg';
import QueueList from '../QueueList';

export default function Queue() {
	const [showQueue, setShowQueue] = useState(false);
	const onClick = () => {
		setShowQueue(!showQueue);
	};

	return (
		<>
			<button className={`icon${showQueue ? ' active' : ''}`} id="toggle-queue" onClick={onClick} title="Toggle queue" type="button">
				<QueueIcon />
				Toggle queue
			</button>
			<QueueList className={showQueue ? 'enter' : ''} />
		</>
	);
}
