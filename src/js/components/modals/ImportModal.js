import importItunes from '../../helpers/import';
import { ReactComponent as LoadingIcon } from '../../../svg/loading.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as XIcon } from '../../../svg/x.svg';

export default class ImportModal extends React.Component {
	state = {
		error: null,
		file: null,
		loading: false,
		url: null,
	}

	static propTypes = {
		onClose: PropTypes.func.isRequired,
	}

	onClose = () => {
		this.props.onClose();
	}

	onSubmit = (e) => {
		e.preventDefault();

		if (!this.state.file) {
			this.setState({ error: 'No file selected.' });
			return;
		}

		this.setState({ error: null, loading: true });
		importItunes(this.state.file)
			.then((json) => {
				const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
				const url = URL.createObjectURL(blob);
				this.setState({ loading: false, url });
			})
			.catch((error) => {
				this.setState({ error: error.message, loading: false });
			});
	}

	onChange = (e) => {
		this.setState({ file: e.target.files[0] });
	}

	render() {
		return (
			<section className="modal-bg">
				<div className="modal">
					<button className="icon icon--small" id="close" onClick={this.onClose} type="button">
						<XIcon />
						Close
					</button>
					<form onSubmit={this.onSubmit}>
						<h1>Export from iTunes</h1>
						<ol>
							<li>Open iTunes</li>
							<li>Go to File &gt; Library &gt; Export Library&hellip;</li>
							<li>Select a location to save the XML file</li>
							<li>Click the Save button</li>
						</ol>
						<h1>Import from iTunes</h1>
						{this.state.error ? <p className="error">{this.state.error}</p> : null}
						<p>
							<input accept=".xml" onChange={this.onChange} type="file" />
						</p>
						<p>
							<button className="button--primary" disabled={!this.state.file} type="submit">Import</button>
						</p>
						{this.state.url ? (
							<p>
								<a download href={this.state.url}>
									Download the new library file, rename it to songs.json, and place it in src/data.
								</a>
							</p>
						) : null}
					</form>
					{this.state.loading ? (
						<div className="loading">
							<LoadingIcon height="64" width="64" />
						</div>
					) : null}
				</div>
			</section>
		);
	}
}
