import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { client } from "../api";
import ArtisteSong from "../components/ArtisteSong";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";
import { AiOutlineLoading } from "react-icons/ai";

const FavoritesPage = () => {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { user, token } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const fetchFavorites = async () => {
		setLoading(true);
		setError(false);
		await client
			.get("/users/favorites", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setLoading(false);
				setFavorites(res.data);
			})
			.catch(() => {
				setLoading(false);
				setError(true);
			});
	};

	useEffect(() => {
		token && fetchFavorites();
	}, []);

	const onPlay = (song) => {
		const index = favorites?.findIndex((s) => s._id == song._id);

		dispatch(setTrackList({ list: favorites, index }));
		dispatch(playTrack(song));
	};

	if (!user) {
		return (
			<Flex align="center" justify="center" h="100vh">
				<Flex direction="column" align="center" gap={4}>
					<Text textAlign="center" color="zinc.500">
						Please login to see your favorites
					</Text>
					<Link to="/auth/login">
						<Button variant="unstyled" bg="accent.main" px={6}>
							Login
						</Button>
					</Link>
				</Flex>
			</Flex>
		);
	}

	return (
		<Box
			p={4}
			pb={32}
			minH="100vh"
			pt={{ base: 20, md: 6 }}
			pl={{ base: 4, md: 14, xl: 0 }}>
			<Box mb={6}>
				<Heading
					fontSize={{ base: "lg", md: "2xl" }}
					fontWeight="semibold"
					mb={1}>
					Favorites
				</Heading>
				<Text fontSize="sm" color="zinc.400">
					Your favorite songs
				</Text>
			</Box>
			<Divider h="1px" border={0} bg="gray.500" />
			{loading && favorites.length < 1 && (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			)}
			{error && (
				<Text color="zinc.300" my={2}>
					Sorry, an error occured
				</Text>
			)}
			<Flex direction="column" gap={4} mt={4}>
				{favorites?.map((song) => (
					<ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
				))}
			</Flex>
			{!loading && !error && favorites.length < 1 && (
				<Text>{"You haven't liked any songs yet..."}</Text>
			)}
		</Box>
	);
};

export default FavoritesPage;
