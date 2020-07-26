import { createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';

export const shuffleSlice = createSlice({
	name: 'shuffle',
	initialState: Storage.get('shuffle', false),
	reducers: {
		toggleShuffle: (state) => {
			const value = !state;
			Storage.set('shuffle', value);
			return value;
		},
	},
});

export const { toggleShuffle } = shuffleSlice.actions;

export const selectShuffle = (state) => state.shuffle;

export default shuffleSlice.reducer;
