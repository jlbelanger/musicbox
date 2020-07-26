import { configureStore } from '@reduxjs/toolkit';
import isPlayingReducer from './slices/isPlaying';
import queueReducer from './slices/queue';
import repeatReducer from './slices/repeat';
import shuffleReducer from './slices/shuffle';
import songsReducer from './slices/songs';
import sortReducer from './slices/sort';

export default configureStore({
	reducer: {
		isPlaying: isPlayingReducer,
		queue: queueReducer,
		repeat: repeatReducer,
		shuffle: shuffleReducer,
		songs: songsReducer,
		sort: sortReducer,
	},
});
