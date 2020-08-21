import React from 'react';

export default function ImportModalFile() {
	const onChange = (e) => {
		window.api.setPath(e.target.files[0].path);
	};

	return (
		<p>
			Select a .json file.
			<input accept=".json" onChange={onChange} type="file" />
		</p>
	);
}
