import { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import CreatePlaylistCard from "../components/CreatePlaylistCard";
import { client } from "../api";
import { AiOutlineLoading } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";

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

	if (error) {
		return (
			<Flex align="center" justify="center" minH="100vh">
				<Flex direction="column" align="center" color="accent.light">
					<MdErrorOutline color="inherit" size={32} />
					<Text color="zinc.400" textAlign="center" mt={2}>
						An error occured while fetching playlists.
					</Text>
				</Flex>
			</Flex>
		);
	}

	return (
		<Box p={6} pb={32} pt={{ base: 20, md: 6 }} pl={{ base: 4, md: 14, xl: 0 }}>
			<Box>
				<Heading
					as="h2"
					fontSize={{ base: "lg", md: "2xl" }}
					fontWeight="semibold"
					mb={{ base: 1, md: 3 }}>
					Playlists
				</Heading>
				<Text color="zinc.400" fontSize="sm">
					Here are some playlists curated by users.
				</Text>
			</Box>
			{loading && playlists.length < 1 && (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			)}
			{!loading && !error && (
				<Grid
					templateColumns={{
						base: "repeat(2, 1fr)",
						md: "repeat(3, 1fr)",
						lg: "repeat(4, 1fr)",
						xl: "repeat(5, 1fr)",
					}}
					gap={5}
					mt={10}>
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
