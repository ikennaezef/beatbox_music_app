import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		userId: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
		},
		songs: {
			type: Array,
			default: [],
		},
		isPrivate: {
			type: Boolean,
			required: true,
			default: false,
		},
		type: {
			type: String,
			required: true,
			default: "Playlist",
		},
	},
	{ timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);
export default Playlist;
