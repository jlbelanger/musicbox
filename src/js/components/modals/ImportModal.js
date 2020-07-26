import React, { useState } from 'react';
import importItunes from '../../helpers/import';
import { ReactComponent as LoadingIcon } from '../../../svg/loading.svg';
import PropTypes from 'prop-types';
import { ReactComponent as XIcon } from '../../../svg/x.svg';

export default function ImportModal(props) {
	const [error, setError] = useState(null);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState(null);

	const onClose = () => {
		if (props.onClose !== null) {
			props.onClose();
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (!file) {
			setError('No file selected.');
			return;
		}

		setLoading(true);
		setError(null);
		importItunes(file)
			.then((json) => {
				const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
				setLoading(false);
				setUrl(URL.createObjectURL(blob));
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	};

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<section className="modal-bg">
			<div className="modal">
				{props.showClose ? (
					<button className="icon icon--small" id="close" onClick={onClose} type="button">
						<XIcon />
						Close
					</button>
				) : null}
				<form onSubmit={onSubmit}>
					<h1>Export from iTunes</h1>
					<ol>
						<li>Open iTunes</li>
						<li>Go to File &gt; Library &gt; Export Library&hellip;</li>
						<li>Select a location to save the XML file</li>
						<li>Click the Save button</li>
					</ol>
					<h1>Import from iTunes</h1>
					{error ? <p className="error">{error}</p> : null}
					<p>
						<input accept=".xml" onChange={onChange} type="file" />
					</p>
					<p>
						<button className="button--primary" disabled={!file} type="submit">Import</button>
					</p>
					{url ? (
						<p>
							<a download href={url}>
								Download the new library file, rename it to songs.json, and place it in src/data.
							</a>
						</p>
					) : null}
				</form>
				{loading ? (
					<div className="loading">
						<LoadingIcon height="64" width="64" />
					</div>
				) : null}
			</div>
		</section>
	);
}

ImportModal.propTypes = {
	onClose: PropTypes.func,
	showClose: PropTypes.bool,
};

ImportModal.defaultProps = {
	onClose: null,
	showClose: true,
};
