import { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import CreatePlaylistCard from "../components/CreatePlaylistCard";
import { client } from "../api";
import { AiOutlineLoading } from "react-icons/ai";

const PlaylistsPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [playlists, setPlaylists] = useState([]);

	const fetchPlaylists = async () => {
		setLoading(true);
		setError(false);
		await client
			.get("/playlists")
			.then((res) => {
				setLoading(false);
				setPlaylists(res.data);
			})
			.catch(() => {
				setLoading(false);
				setError(true);
			});
	};

	useEffect(() => {
		fetchPlaylists();
	}, []);

	return (
		<Box p={6} pb={32}>
			<Box>
				<Heading as="h2" fontSize="2xl" mb={2} fontWeight="semibold">
					Playlists
				</Heading>
				<Text>Here are some playlists curated by users.</Text>
			</Box>
			{loading && playlists.length < 1 && (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			)}
			{!loading && !error && (
				<Grid templateColumns="repeat(5, 1fr)" gap={5} mt={10}>
					<CreatePlaylistCard />
					{playlists.map((playlist) => (
						<PlaylistCard key={playlist?._id} playlist={playlist} />
					))}
				</Grid>
			)}
		</Box>
	);
};

export default PlaylistsPage;
