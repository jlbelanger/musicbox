import { createSlice } from '@reduxjs/toolkit';
import { sort } from './helpers/sort';
import Storage from './helpers/Storage';

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		currentSongIndex: null,
		isPlaying: false,
		repeat: Storage.get('repeat', false),
		shuffle: Storage.get('shuffle', false),
		sortColumn: Storage.get('sortColumn', 'artist'),
		sortDirection: Storage.get('sortDirection', 'asc'),
		songs: require('../data/songs.json'),
	},
	reducers: {
		toggleIsPlaying: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		toggleRepeat: (state) => {
			state.repeat = !state.repeat;
			Storage.set('repeat', state.repeat);
		},
		toggleShuffle: (state) => {
			state.shuffle = !state.shuffle;
			Storage.set('shuffle', state.shuffle);
		},
		toggleSortDirection: (state) => {
			state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
			state.songs = sort(state.songs, state.sortColumn, state.sortDirection);
			Storage.set('sortDirection', state.sortDirection);
		},
		toggleSongChecked: (state, action) => {
			state.songs[action.payload].checked = !state.songs[action.payload].checked;
		},
		setSongRating: (state, action) => {
			state.songs[action.payload.index].rating = action.payload.value;
		},
		setCurrentSongIndex: (state, action) => {
			state.currentSongIndex = action.payload;
			if (state.currentSongIndex === null) {
				state.isPlaying = false;
			}
		},
		setSortColumn: (state, action) => {
			state.sortColumn = action.payload;
			state.songs = sort(state.songs, state.sortColumn, state.sortDirection);
			Storage.set('sortColumn', state.sortColumn);
		},
	},
});

export const {
	toggleIsPlaying,
	toggleRepeat,
	toggleShuffle,
	toggleSortDirection,
	toggleSongChecked,
	setCurrentSongIndex,
	setSongRating,
	setSortColumn,
} = appSlice.actions;

export const selectCurrentSongIndex = (state) => state.app.currentSongIndex;
export const selectCurrentSong = (state) => (state.app.songs[state.app.currentSongIndex]);
export const selectIsPlaying = (state) => state.app.isPlaying;
export const selectNumSongs = (state) => state.app.songs.length;
export const selectRepeat = (state) => state.app.repeat;
export const selectShuffle = (state) => state.app.shuffle;
export const selectSongs = (state) => state.app.songs;
export const selectSortColumn = (state) => state.app.sortColumn;
export const selectSortDirection = (state) => state.app.sortDirection;

export default appSlice.reducer;
