import Song from "../models/Song.js";
import User from "../models/User.js";

//@desc Get all the songs
//@route GET /api/songs
//@access public
const getSongs = async (req, res) => {
	const songs = await Song.find({});

	if (!songs) {
		return res.status(400).json({ message: "An error occured!" });
	}
	const shuffledSongs = songs.sort(() => (Math.random() > 0.5 ? 1 : -1));

	res.status(200).json(shuffledSongs);
};

//@desc Get the top songs
//@route GET /api/songs/top
//@access public
const getTopSongs = async (req, res) => {
	try {
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

//@desc Get the new releases
//@route GET /api/songs/releases
//@access public
const getNewReleases = async (req, res) => {
	const songs = await Song.find({});

	const result = songs.slice(-11, -1);
	const shuffledSongs = result.sort(() => (Math.random() > 0.5 ? 1 : -1));

	res.status(200).json(shuffledSongs);
};

//@desc Get random songs
//@route GET /api/songs/random
//@access public
const getRandom = async (req, res) => {
	const songs = await Song.find({});

	const shuffledSongs = songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
	const result = shuffledSongs.slice(-11, -1);

	res.status(200).json(result);
};

//@desc Get the popular songs around you
//@route GET /api/songs/popular
//@access public
const getAroundYou = async (req, res) => {
	const songs = await Song.find({});

	const result = songs.slice(0, 11);
	const shuffledSongs = result.sort(() => (Math.random() > 0.5 ? 1 : -1));

	res.status(200).json(shuffledSongs);
};

//@desc Like or unlike a song
//@route PATCH /api/songs/like/:id
//@access private
const likeSong = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user.id;
		const song = await Song.findById(id);
		const user = await User.findById(userId);

		if (!user) {
			return res.json(404).json({ message: "User not found!" });
		}
		if (!song) {
			return res.json(404).json({ message: "Song not found!" });
		}

		const isLiked = song.likes.get(userId);

		if (isLiked) {
			song.likes.delete(userId);
			user.favorites = user.favorites.filter((songId) => songId !== id);
		} else {
			song.likes.set(userId, true);
			user.favorites.push(id);
		}

		const savedSong = await song.save();
		const savedUser = await user.save();

		if (!savedSong || !savedUser) {
			return res.status(400).json({ message: "An error occured" });
		}

		const returnUser = {
			id: savedUser.id,
			username: savedUser.username,
			favorites: savedUser.favorites,
			playlists: savedUser.playlists,
		};

		res.status(200).json(returnUser);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

export {
	getSongs,
	getTopSongs,
	getNewReleases,
	getRandom,
	getAroundYou,
	likeSong,
};
