import { configureStore } from '@reduxjs/toolkit';
import queueReducer from './slices/queue';
import repeatReducer from './slices/repeat';
import songsReducer from './slices/songs';

export default configureStore({
	reducer: {
		queue: queueReducer,
		repeat: repeatReducer,
		songs: songsReducer,
	},
});
