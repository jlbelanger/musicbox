import appReducer from './slices/app.js';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
	reducer: {
		app: appReducer,
	},
});
