import '../../scss/components/Table.scss';
import React from 'react';
import Row from './table/Row';
import { selectSongIds } from '../slices/app';
import SortableHeader from './table/SortableHeader';
import { useSelector } from 'react-redux';

export default function App() {
	const songIds = useSelector(selectSongIds);
	return (
		<table>
			<thead>
				<tr>
					<th />
					<SortableHeader name="checked" label="" />
					<SortableHeader name="title" label="Title" />
					<SortableHeader name="artist" label="Artist" />
					<SortableHeader name="album" label="Album" />
					<SortableHeader name="year" label="Year" />
					<SortableHeader name="genre" label="Genre" />
					<SortableHeader name="rating" label="Rating" />
					<SortableHeader name="last_played" label="Last Played" />
					<SortableHeader name="date_added" label="Date Added" />
				</tr>
			</thead>
			<tbody>
				{songIds.map((songId) => (
					<Row key={songId} id={songId} />
				))}
			</tbody>
		</table>
	);
}
