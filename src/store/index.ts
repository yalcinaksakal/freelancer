import { configureStore } from "@reduxjs/toolkit";

import datareducer from "./data";

const store = configureStore({
	reducer: {
		data: datareducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
