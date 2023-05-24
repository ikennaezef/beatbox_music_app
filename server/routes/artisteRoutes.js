import express from "express";
import {
	getArtiste,
	getArtistes,
	getTopArtistes,
} from "../controllers/artistController.js";

const router = express.Router();

router.get("/all", getArtistes);
router.get("/top", getTopArtistes);
router.get("/:id", getArtiste);

export { router as artisteRouter };
