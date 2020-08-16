import ImportModal from './modals/ImportModal';
import Main from './Main';
import React from 'react';

export default function App() {
	if (!window.musicbox.hasSongs()) {
		return <ImportModal showClose={false} />;
	}
	return (
		<Main />
	);
}
