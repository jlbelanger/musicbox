import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app';
import repeatReducer from './slices/repeat';
import songsReducer from './slices/songs';

export default configureStore({
	reducer: {
		app: appReducer,
		repeat: repeatReducer,
		songs: songsReducer,
	},
});
