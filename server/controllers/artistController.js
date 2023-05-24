import Artiste from "../models/Artiste.js";
import Song from "../models/Song.js";

const getArtistes = async (req, res) => {
	const artistes = await Artiste.find();

	if (!artistes) {
		res.status(400).json({ message: "Artistes not found!" });
	}

	res.status(200).json(artistes);
};

const getTopArtistes = async (req, res) => {
	const artistes = await Artiste.find();

	if (!artistes) {
		res.status(400).json({ message: "Artistes not found!" });
	}

	const result = artistes.slice(1, 11);

	res.status(200).json(result);
};

const getArtiste = async (req, res) => {
	const { id } = req.params;

	const artiste = await Artiste.findById(id);
	if (!artiste) {
		return res.status(404).json({ message: "Artiste not found!" });
	}

	const artisteSongs = await Song.find({ artistIds: id });
	if (!artisteSongs) {
		return res.status(400).json({ message: "An error occured!" });
	}

	res.status(200).json({ artiste, songs: artisteSongs });
};

export { getArtiste, getArtistes, getTopArtistes };
