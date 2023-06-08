import express from "express";
import {
	createPlaylist,
	editPlaylist,
	getPlaylist,
	getPlaylists,
} from "../controllers/playlistController.js";
import { verifyToken } from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", getPlaylists);
router.get("/:id", getPlaylist);
router.post("/create", verifyToken, createPlaylist);
router.patch("/:id", verifyToken, editPlaylist);

export { router as playlistRouter };
