import { createSlice } from '@reduxjs/toolkit';
import { getActiveSongs } from '../helpers/queue';

const fetchSongs = () => require('../../data/songs.json'); // eslint-disable-line global-require

export const initialState = fetchSongs();

export const songsSlice = createSlice({
	name: 'songs',
	initialState,
	reducers: {
		setRating: (state, action) => {
			const { id, value } = action.payload;
			return {
				...state,
				[id]: {
					...state[id],
					rating: value,
				},
			};
		},
		toggleChecked: (state, action) => {
			const { id } = action.payload;
			return {
				...state,
				[id]: {
					...state[id],
					checked: !state[id].checked,
				},
			};
		},
	},
});

export const {
	setRating,
	toggleChecked,
} = songsSlice.actions;

export const selectSongs = (state) => state.songs;
export const selectActiveSongs = (state) => getActiveSongs(selectSongs(state));
export const selectNumActiveSongs = (state) => (selectActiveSongs(state).length);
export const selectHasSongs = (state) => (Object.keys(state.songs).length > 0);

export default songsSlice.reducer;
