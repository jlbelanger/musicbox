import { createSlice } from '@reduxjs/toolkit';
import { sort } from './helpers/sort';

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		currentIndex: null,
		isPlaying: false,
		repeat: false,
		shuffle: true,
		sortColumn: 'artist',
		sortDirection: 'asc',
		songs: [],
	},
	reducers: {
		toggleIsPlaying: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		toggleRepeat: (state) => {
			state.repeat = !state.repeat;
		},
		toggleShuffle: (state) => {
			state.shuffle = !state.shuffle;
		},
		toggleSortDirection: (state) => {
			state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
			state.songs = sort(state.songs, state.sortColumn, state.sortDirection);
		},
		toggleSongChecked: (state, action) => {
			state.songs[action.payload].checked = !state.songs[action.payload].checked;
		},
		setSongRating: (state, action) => {
			state.songs[action.payload.index].rating = action.payload.value;
		},
		setCurrentIndex: (state, action) => {
			state.currentIndex = action.payload;
			if (state.currentIndex === null) {
				state.isPlaying = false;
			}
		},
		setSortColumn: (state, action) => {
			state.sortColumn = action.payload;
			state.songs = sort(state.songs, state.sortColumn, state.sortDirection);
		},
	},
});

export const {
	toggleIsPlaying,
	toggleRepeat,
	toggleShuffle,
	toggleSortDirection,
	toggleSongChecked,
	setCurrentIndex,
	setSongRating,
	setSortColumn,
} = appSlice.actions;

export const selectCurrentIndex = (state) => state.app.currentIndex;
export const selectCurrentSong = (state) => (state.app.songs[state.app.currentIndex]);
export const selectIsPlaying = (state) => state.app.isPlaying;
export const selectNumSongs = (state) => state.app.songs.length;
export const selectRepeat = (state) => state.app.repeat;
export const selectShuffle = (state) => state.app.shuffle;
export const selectSongs = (state) => state.app.songs;
export const selectSortColumn = (state) => state.app.sortColumn;
export const selectSortDirection = (state) => state.app.sortDirection;

export default appSlice.reducer;
