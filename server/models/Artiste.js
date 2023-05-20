import mongoose from "mongoose";

const ArtisteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		require: true,
		default: "Artiste",
	},
	bio: {
		type: String,
	},
});

const Artiste = mongoose.model("Artiste", ArtisteSchema);
export default Artiste;
