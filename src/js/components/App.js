import ImportModal from './modals/ImportModal';
import Main from './Main';
import React from 'react';
import { selectHasSongs } from '../slices/songs';
import { useSelector } from 'react-redux';

export default function App() {
	const hasSongs = useSelector(selectHasSongs);
	if (hasSongs <= 0) {
		return <ImportModal showClose={false} />;
	}

	return (
		<Main />
	);
}
