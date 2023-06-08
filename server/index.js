import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/dbConnection.js";
import { songsRouter } from "./routes/songRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { artisteRouter } from "./routes/artisteRoutes.js";
import { playlistRouter } from "./routes/playlistRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

app.use("/api/songs/", songsRouter);
app.use("/api/users/", userRouter);
app.use("/api/artistes/", artisteRouter);
app.use("/api/playlists/", playlistRouter);

const port = process.env.PORT || 6000;

app.listen(port, async () => {
	console.log(`SERVER RUNNING ON PORT ${port}`);
});
