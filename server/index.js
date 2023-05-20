import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/dbConnection.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

const port = process.env.PORT || 6000;

app.listen(port, () => {
	console.log(`SERVER RUNNING ON PORT ${port}`);
});
