import { ReactComponent as ImportIcon } from '../../../svg/import.svg';
import ImportModal from '../modals/ImportModal';
import React from 'react';

export default class Import extends React.Component {
	state = {
		isModalVisible: false,
	}

	onClick = () => {
		this.setState({ isModalVisible: true });
	}

	onCloseModal = () => {
		this.setState({ isModalVisible: false });
	}

	render() {
		return (
			<>
				<button className="icon" onClick={this.onClick} type="button">
					<ImportIcon />
					Import
				</button>
				{this.state.isModalVisible ? <ImportModal onClose={this.onCloseModal} /> : null}
			</>
		);
	}
}
