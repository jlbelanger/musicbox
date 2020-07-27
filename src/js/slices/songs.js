import { createSlice } from '@reduxjs/toolkit';

const fetchSongs = () => require('../../data/songs.json'); // eslint-disable-line global-require

export const songsSlice = createSlice({
	name: 'songs',
	initialState: fetchSongs(),
	reducers: {
		setRating: (state, action) => (
			{
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					rating: action.payload.value,
				},
			}
		),
		toggleChecked: (state, action) => (
			{
				...state,
				[action.payload]: {
					...state[action.payload],
					checked: !state[action.payload].checked,
				},
			}
		),
	},
});

export const {
	setRating,
	toggleChecked,
} = songsSlice.actions;

export const selectSongs = (state) => state.songs;
export const selectActiveSongs = (state) => (
	Object.values(selectSongs(state)).filter((song) => (song.checked))
);
export const selectNumSongs = (state) => (selectActiveSongs(state).length);
export const selectHasSongs = (state) => (selectNumSongs(state) > 0);

export default songsSlice.reducer;
