import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
	currentTrack: null,
	isPlaying: false,
	currentIndex: 0,
	trackList: [],
	repeatStatus: "OFF",
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
		},
		setPlaying: (state, action) => {
			state.isPlaying = action.payload;
		},
		playTrack: (state, action) => {
			state.currentTrack = action.payload;
			state.isPlaying = true;
		},
		setTrackList: (state, action) => {
			state.trackList = action.payload.list;
			state.currentIndex = action.payload.index ? action.payload.index : 0;
		},
		nextTrack: (state, action) => {
			if (state.currentIndex >= state.trackList.length - 1) {
				state.currentIndex = 0;
				state.currentTrack = state.trackList[0];
			} else {
				state.currentTrack = state.trackList[state.currentIndex + 1];
				state.currentIndex += 1;
			}
		},
		prevTrack: (state, action) => {
			if (state.currentIndex == 0) {
				state.currentIndex = state.trackList.length - 1;
				state.currentTrack = state.trackList[state.trackList.length - 1];
			} else {
				state.currentTrack = state.trackList[state.currentIndex - 1];
				state.currentIndex -= 1;
			}
		},
		toggleRepeat: (state, action) => {
			switch (state.repeatStatus) {
				case "OFF":
					state.repeatStatus = "TRACKLIST";
					break;
				case "TRACKLIST":
					state.repeatStatus = "SINGLE";
					break;
				case "SINGLE":
					state.repeatStatus = "OFF";
					break;
				default:
					break;
			}
		},
	},
});

export const {
	setCurrentTrack,
	setPlaying,
	playTrack,
	setTrackList,
	nextTrack,
	prevTrack,
	toggleRepeat,
} = playerSlice.actions;

export default playerSlice.reducer;
