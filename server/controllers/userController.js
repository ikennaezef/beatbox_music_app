import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Song from "../models/Song.js";

//@desc Login a user
//@route POST /api/auth/login
//@access public
const loginUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "All fields are required!" });
	}

	const user = await User.findOne({ username });

	if (!user) {
		return res.status(404).json({ message: "User not found!" });
	}

	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		return res.status(400).json({ message: "Incorrect username or password!" });
	}

	const accessToken = jwt.sign(
		{
			user: {
				id: user.id,
				username: user.username,
			},
		},
		process.env.JWT_SECRET
	);

	const returnedUser = {
		id: user.id,
		username: user.username,
		favorites: user.favorites,
		playlists: user.playlists,
	};

	res.status(200).json({ user: returnedUser, token: accessToken });
};

//@desc Login a user
//@route POST /api/auth/register
//@access public
const registerUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const duplicateUsername = await User.findOne({ username });
	if (duplicateUsername) {
		return res.status(400).json({ message: "Username already exists!" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({ username, password: hashedPassword });
	if (!newUser) {
		return res.status(400).json({ message: "User not created!" });
	}

	const accessToken = jwt.sign(
		{
			user: {
				id: newUser.id,
				username: newUser.username,
			},
		},
		process.env.JWT_SECRET
	);

	const returnedUser = {
		id: newUser.id,
		username: newUser.username,
		favorites: newUser.favorites,
		playlists: newUser.playlists,
	};

	res.status(200).json({ user: returnedUser, token: accessToken });
};

//@desc Get a user's favorite songs
//@route GET /api/songs/user/favorites
//@access private
const getUserFavoriteSongs = async (req, res) => {
	const { id } = req.user;
	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({ message: "User not found!" });
	}

	const userFavorites = await Promise.all(
		user.favorites.map((id) => Song.findById(id))
	);

	if (!userFavorites) {
		return res.status(404).json({ message: "Not found!" });
	}

	res.status(200).json(userFavorites);
};

export { loginUser, registerUser, getUserFavoriteSongs };
