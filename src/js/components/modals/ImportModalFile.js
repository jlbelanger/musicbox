import React from 'react';

export default function ImportModalFile() {
	const onChange = (e) => {
		window.localStorage.setItem('filePath', e.target.files[0].path);
		window.location.reload();
	};

	return (
		<p>
			Select a .json file.
			<input accept=".json" onChange={onChange} type="file" />
		</p>
	);
}
