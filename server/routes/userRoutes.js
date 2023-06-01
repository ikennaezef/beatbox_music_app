import express from "express";
import {
	getUserFavoriteSongs,
	loginUser,
	registerUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/validateToken.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/favorites", verifyToken, getUserFavoriteSongs);

export { router as userRouter };
