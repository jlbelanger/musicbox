import { createSlice } from '@reduxjs/toolkit';

export const isPlayingSlice = createSlice({
	name: 'isPlaying',
	initialState: false,
	reducers: {
		startPlaying: () => true,
		stopPlaying: () => false,
	},
});

export const {
	startPlaying,
	stopPlaying,
} = isPlayingSlice.actions;

export const selectIsPlaying = (state) => state.isPlaying;

export default isPlayingSlice.reducer;
