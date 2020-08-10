import appReducer from './slices/app';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
	reducer: {
		app: appReducer,
	},
});
