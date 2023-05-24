import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/dbConnection.js";
import { songsRouter } from "./routes/songRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { artistes, songs } from "./data.js";
import Song from "./models/Song.js";
import Artiste from "./models/Artiste.js";
import { artisteRouter } from "./routes/artisteRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

// const newSongs = songs.map((song) => {
// 	return {
// 		...song,
// 		likes: {},
// 	};
// });

app.use("/api/songs/", songsRouter);
app.use("/api/auth/", userRouter);
app.use("/api/artistes/", artisteRouter);

const port = process.env.PORT || 6000;

app.listen(port, async () => {
	// const songs = Song.find();
	// const artistes = Artiste.find();

	// await songs.deleteMany();
	// await artistes.deleteMany();

	// Artiste.insertMany(artistes);
	// Song.insertMany(newSongs);

	console.log(`SERVER RUNNING ON PORT ${port}`);
});
