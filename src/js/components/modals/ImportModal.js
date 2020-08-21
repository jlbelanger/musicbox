import React, { useState } from 'react';
import ImportModalFile from './ImportModalFile';
import ImportModalItunes from './ImportModalItunes';

export default function ImportModal() {
	const [tab, setTab] = useState('file');
	const onClickItunes = () => {
		setTab('itunes');
	};
	const onClickFile = () => {
		setTab('file');
	};

	return (
		<section className="modal-bg">
			<div className="modal">
				<p>You don&rsquo;t have any songs yet.</p>
				<ul className="tabs">
					<li>
						<button onClick={onClickFile} type="button">Select Musicbox file</button>
					</li>
					<li>
						<button onClick={onClickItunes} type="button">Import from iTunes</button>
					</li>
				</ul>
				{tab === 'itunes' ? <ImportModalItunes /> : null}
				{tab === 'file' ? <ImportModalFile /> : null}
			</div>
		</section>
	);
}
