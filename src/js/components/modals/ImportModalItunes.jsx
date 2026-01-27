import importItunes from '../../helpers/import.js';
import LoadingIcon from '../../../svg/loading.svg?react'; // eslint-disable-line import/no-unresolved
import { useState } from 'react';

export default function ImportModalItunes() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showHelp, setShowHelp] = useState(false);

	const onChange = (e) => {
		const file = e.target.files[0];
		setLoading(true);
		setError(null);
		importItunes(file)
			.then((json) => {
				setLoading(false);
				window.api.saveFile(JSON.stringify(json, null, '\t'));
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	};
	const onClick = () => {
		setShowHelp(!showHelp);
	};

	return (
		<>
			{error ? <p className="error">{error}</p> : null}
			<p>
				Select a .xml file.
				<input accept=".xml" onChange={onChange} type="file" />
			</p>
			<button onClick={onClick} type="button">How do I export from iTunes?</button>
			{showHelp ? (
				<ol>
					<li>Open iTunes</li>
					<li>Go to File &gt; Library &gt; Export Library&hellip;</li>
					<li>Select a location to save the XML file</li>
					<li>Click the Save button</li>
				</ol>
			) : null}
			{loading ? (
				<div className="loading">
					<LoadingIcon height="64" width="64" />
				</div>
			) : null}
		</>
	);
}
