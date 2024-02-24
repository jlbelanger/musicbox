import { selectSearch, toggleSearch } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactComponent as SeachIcon } from '../../../svg/search.svg';

export default function Search() {
	const dispatch = useDispatch();
	const search = useSelector(selectSearch);
	const onClick = () => {
		dispatch(toggleSearch());
	};

	return (
		<button className={`icon${search ? ' active' : ''}`} id="search" onClick={onClick} title="Search" type="button">
			<SeachIcon />
			Search
		</button>
	);
}
