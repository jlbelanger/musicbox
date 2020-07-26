import React, { useState } from 'react';
import { ReactComponent as ImportIcon } from '../../../svg/import.svg';
import ImportModal from '../modals/ImportModal';

export default function Import() {
	const [isModalVisible, setModalVisible] = useState(false);

	const onClick = () => {
		setModalVisible(true);
	};

	const onCloseModal = () => {
		setModalVisible(false);
	};

	return (
		<>
			<button className="icon" onClick={onClick} type="button">
				<ImportIcon />
				Import
			</button>
			{isModalVisible ? <ImportModal onClose={onCloseModal} /> : null}
		</>
	);
}
