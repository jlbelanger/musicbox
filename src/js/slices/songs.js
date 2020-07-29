import { createSlice } from '@reduxjs/toolkit';

const fetchSongs = () => require('../../data/songs.json'); // eslint-disable-line global-require

export const initialState = fetchSongs();

export const songsSlice = createSlice({
	name: 'songs',
	initialState,
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
export const selectNumActiveSongs = (state) => (selectActiveSongs(state).length);
export const selectHasSongs = (state) => (Object.keys(state.songs).length > 0);

export default songsSlice.reducer;
