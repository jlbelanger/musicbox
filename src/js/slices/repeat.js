import { createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';

export const repeatSlice = createSlice({
	name: 'repeat',
	initialState: Storage.get('repeat', false),
	reducers: {
		toggleRepeat: (state) => {
			const value = !state;
			Storage.set('repeat', value);
			return value;
		},
	},
});

export const { toggleRepeat } = repeatSlice.actions;

export const selectRepeat = (state) => state.repeat;

export default repeatSlice.reducer;
