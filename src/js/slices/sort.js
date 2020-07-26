import { createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';

export const sortSlice = createSlice({
	name: 'sort',
	initialState: {
		column: Storage.get('sortColumn', 'artist'),
		direction: Storage.get('sortDirection', 'asc'),
	},
	reducers: {
		setColumn: (state, action) => {
			const column = action.payload;
			Storage.set('sortColumn', column);
			return {
				...state,
				column,
				direction: 'asc',
			};
		},
		toggleDirection: (state) => {
			const direction = state.direction === 'asc' ? 'desc' : 'asc';
			Storage.set('sortDirection', direction);
			return {
				...state,
				direction,
			};
		},
	},
});

export const {
	setColumn,
	toggleDirection,
} = sortSlice.actions;

export const selectColumn = (state) => state.sort.column;
export const selectDirection = (state) => state.sort.direction;

export default sortSlice.reducer;
