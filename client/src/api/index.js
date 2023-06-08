import axios from "axios";

export const client = axios.create({
	baseURL: "https://beatbox-music-backend.vercel.app/api/",
});
