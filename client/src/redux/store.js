import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import playerReducer from "./slices/playerSlice";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";

const persistConfig = { key: "root", storage, version: 1 };
const reducers = combineReducers({
	player: playerReducer,
	user: userReducer,
	modal: modalReducer,
});
const persistedReducers = persistReducer(persistConfig, reducers);
export const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
			},
		}),
});
