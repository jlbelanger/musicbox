import { createSlice } from '@reduxjs/toolkit';

export const initialState = false;

export const isPlayingSlice = createSlice({
	name: 'isPlaying',
	initialState,
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
