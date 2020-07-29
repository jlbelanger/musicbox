import { configureStore } from '@reduxjs/toolkit';
import isPlayingReducer from './slices/isPlaying';
import queueReducer from './slices/queue';
import repeatReducer from './slices/repeat';
import songsReducer from './slices/songs';

export default configureStore({
	reducer: {
		isPlaying: isPlayingReducer,
		queue: queueReducer,
		repeat: repeatReducer,
		songs: songsReducer,
	},
});
