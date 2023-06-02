import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	message: "Please login to save songs to your favorites.",
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setModalMessage: (state, action) => {
			state.message = action.payload;
		},
	},
});

export const { setModalMessage } = modalSlice.actions;

export default modalSlice.reducer;
