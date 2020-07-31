import appReducer from './slices/app';
import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './slices/songs';

export default configureStore({
	reducer: {
		app: appReducer,
		songs: songsReducer,
	},
});
