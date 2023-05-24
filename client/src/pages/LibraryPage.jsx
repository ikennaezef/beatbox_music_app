import React, { useEffect, useState } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import { AiOutlineLoading } from "react-icons/ai";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";

const LibraryPage = () => {
	const [songs, setSongs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchSongs = async () => {
		setLoading(true);
		setError(false);
		await axios
			.get("http://localhost:3001/api/songs")
			.then((res) => {
				setSongs(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log("ERROR--->", err);
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchSongs();
	}, []);

	return (
		<Box p={6} minH="100vh">
			<Box mb={6}>
				<Heading fontSize="2xl" fontWeight="semibold" mb={3}>
					Library
				</Heading>
				<Text fontSize="sm" color="zinc.400">
					Discover interesting songs
				</Text>
			</Box>
			{loading && songs.length < 1 && (
				<Flex align="center" justify="center" minH="20rem">
					<AiOutlineLoading className="text-accent animate-spin" size={36} />
				</Flex>
			)}
			<Grid templateColumns="repeat(5, 1fr)" gap={6}>
				{songs.map((song) => (
					<SongCard key={song._id} song={song} />
				))}
			</Grid>
			{error && (
				<Box>
					<Text>Sorry, an error occured</Text>
				</Box>
			)}
		</Box>
	);
};

export default LibraryPage;
