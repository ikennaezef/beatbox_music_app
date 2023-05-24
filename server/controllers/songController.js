import Song from "../models/Song.js";

const getSongs = async (req, res) => {
	const songs = await Song.find();

	if (!songs) {
		return res.status(400).json({ message: "An error occured!" });
	}
	const shuffledSongs = songs.sort(() => (Math.random() > 0.5 ? 1 : -1));

	res.status(200).json(shuffledSongs);
};

const getTopSongs = async (req, res) => {
	try {
		// const songs = await Song.find().sort({ likes: -1 });
		// const topTen = songs.slice(0, 11);
		// res.status(200).json({ songs });
		const results = await Song.aggregate([
			{
				$project: {
					title: 1,
					duration: 1,
					coverImage: 1,
					artistes: 1,
					songUrl: 1,
					artistIds: 1,
					type: 1,
					likes: {
						$size: {
							$objectToArray: "$likes",
						},
					},
				},
			},
			{ $sort: { likes: -1 } },
			{ $limit: 8 },
		]);
		res.status(200).json(results);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getNewReleases = async (req, res) => {
	const songs = await Song.find();

	const result = songs.slice(-11, -1);
	const shuffledSongs = result.sort(() => (Math.random() > 0.5 ? 1 : -1));

	res.status(200).json(shuffledSongs);
};

const getAroundYou = async (req, res) => {
	const songs = await Song.find();

	const result = songs.slice(0, 11);
	const shuffledSongs = result.sort(() => (Math.random() > 0.5 ? 1 : -1));

	res.status(200).json(shuffledSongs);
};

const likeSong = async (req, res) => {};

export { getSongs, likeSong, getTopSongs, getNewReleases, getAroundYou };
