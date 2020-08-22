import '../../scss/components/Table.scss';
import Header from './Header';
import ImportModal from './modals/ImportModal';
import React from 'react';

export default function App() {
	return (
		<main>
			{window.api.hasJson() ? null : <ImportModal />}
			<Header />
			<article id="table" />
		</main>
	);
}
