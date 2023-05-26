import React, { useState } from 'react';
import ImportModalFile from './ImportModalFile';
import ImportModalItunes from './ImportModalItunes';
import Modal from '../Modal';
import TabButton from '../TabButton';
import TabFrame from '../TabFrame';

export default function ImportModal() {
	const [tab, setTab] = useState('Select Musicbox file');
	const onClickTab = (e) => {
		setTab(e.target.getAttribute('data-tab'));
	};

	return (
		<Modal cancelable={false} id="import-modal">
			<div className="modal__header">
				<p>You don&rsquo;t have any songs yet.</p>
			</div>

			<ul className="tabs">
				<TabButton label="Select Musicbox file" onClick={onClickTab} tab={tab} />
				<TabButton label="Import from iTunes" onClick={onClickTab} tab={tab} />
			</ul>

			<TabFrame label="Select Musicbox file" tab={tab}>
				<ImportModalFile />
			</TabFrame>

			<TabFrame label="Import from iTunes" tab={tab}>
				<ImportModalItunes />
			</TabFrame>
		</Modal>
	);
}
