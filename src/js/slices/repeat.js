import { createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';

export const initialState = Storage.get('repeat', false);

export const repeatSlice = createSlice({
	name: 'repeat',
	initialState,
	reducers: {
		toggleRepeat: (state) => !state,
	},
});

export const { toggleRepeat } = repeatSlice.actions;

export const selectRepeat = (state) => state.repeat;

export default repeatSlice.reducer;
