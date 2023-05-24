import express from "express";
import {
	getAroundYou,
	getNewReleases,
	getSongs,
	getTopSongs,
	likeSong,
} from "../controllers/songController.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/top", getTopSongs);
router.get("/releases", getNewReleases);
router.get("/popular", getAroundYou);
router.patch("/:id", likeSong);

export { router as songsRouter };
