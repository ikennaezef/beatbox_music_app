import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	SimpleGrid,
	Spinner,
	Switch,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlaylistSong from "../components/PlaylistSong";
import { setUser } from "../redux/slices/userSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { client } from "../api";

const CreatePlaylistPage = () => {
	const [favorites, setFavorites] = useState([]);
	const [favoritesLoading, setFavoritesLoading] = useState(false);
	const [otherSongs, setOtherSongs] = useState([]);
	const [otherSongsLoading, setOtherSongsLoading] = useState(false);
	const [createPlLoading, setCreatePlLoading] = useState(false);
	const [inputs, setInputs] = useState({
		playlistName: "",
		playlistDesc: "",
		isPrivate: false,
	});
	const [error, setError] = useState({ favorites: false, otherSongs: false });
	const [addedSongs, setAddedSongs] = useState([]);
	const toast = useToast();
	const navigate = useNavigate();

	const { user, token } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const fetchFavorites = async () => {
		setFavoritesLoading(true);
		setError({ ...error, favorites: false });
		await client
			.get("/users/favorites", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setFavoritesLoading(false);
				setFavorites(res.data);
			})
			.catch(() => {
				setFavoritesLoading(false);
				setError({ ...error, favorites: true });
			});
	};

	const fetchOtherSongs = async () => {
		setError({ ...error, otherSongs: false });
		setOtherSongsLoading(true);
		await client
			.get("/songs/random")
			.then((res) => {
				setOtherSongs(res.data);
				setOtherSongsLoading(false);
			})
			.catch(() => {
				setError({ ...error, otherSongs: true });
				setOtherSongsLoading(false);
			});
	};

	useEffect(() => {
		fetchFavorites();
		fetchOtherSongs();
	}, []);

	const createPlaylist = async () => {
		const playlistDetails = {
			title: inputs.playlistName,
			description: inputs.playlistDesc,
			isPrivate: inputs.isPrivate,
			songIds: addedSongs,
		};
		setCreatePlLoading(true);
		await client
			.post("/playlists/create", playlistDetails, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setCreatePlLoading(false);
				toast({
					description: "Playlist created!",
					status: "success",
				});
				navigate("/home");
				dispatch(
					setUser({ ...user, playlists: [...user?.playlists, res.data?._id] })
				);
			})
			.catch(() => {
				setCreatePlLoading(false);
				toast({
					description: "An error occured!",
					status: "error",
				});
			});
	};

	const songIsInPlaylist = (id) => {
		return addedSongs.includes(id);
	};

	const toggleAddSong = (id) => {
		if (songIsInPlaylist(id)) {
			setAddedSongs(addedSongs.filter((songId) => songId !== id));
		} else {
			setAddedSongs([...addedSongs, id]);
		}
	};

	const canCreatePlaylist = () => {
		if (inputs.playlistName == "") {
			return false;
		}
		if (addedSongs.length < 1) {
			return false;
		}

		return true;
	};

	const handleCreatePlaylist = async () => {
		if (!canCreatePlaylist()) {
			toast({
				description:
					inputs.playlistName == ""
						? "Give your playlist a name!"
						: "Add songs to your playlist!",
				status: "error",
			});
		} else {
			createPlaylist();
		}
	};

	return (
		<Box
			p={6}
			pb={32}
			minH="100vh"
			pt={{ base: 20, md: 6 }}
			pl={{ base: 4, md: 14, xl: 0 }}>
			<Flex align="center" justify="space-between" mb={6}>
				<Heading fontSize="2xl" fontWeight="semibold">
					Create a Playlist
				</Heading>
				<Button
					onClick={handleCreatePlaylist}
					variant="unstyled"
					size="sm"
					px={4}
					bg="accent.light"
					fontSize="sm"
					rounded="md">
					{createPlLoading ? <Spinner color="white" size="sm" /> : "Create"}
				</Button>
			</Flex>
			<Divider h="1px" border={0} bg="gray.500" />
			<Box mt={4}>
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="private_playlist" mb="0">
						Private playlist?
					</FormLabel>
					<Switch
						id="private_playlist"
						colorScheme="red"
						size="sm"
						value={inputs.isPrivate}
						onChange={() =>
							setInputs({ ...inputs, isPrivate: !inputs.isPrivate })
						}
					/>
				</FormControl>
			</Box>
			<Box pt={6}>
				<Flex
					direction={{ base: "column", md: "row" }}
					justify="space-between"
					gap={6}>
					<FormControl isRequired>
						<FormLabel fontSize="xs" color="zinc.400">
							Playlist Name
						</FormLabel>
						<Input
							borderColor="accent.transparent"
							rounded="base"
							outline={0}
							variant="flushed"
							type="text"
							color="zinc.300"
							fontSize="sm"
							value={inputs.playlistName}
							onChange={(e) =>
								setInputs({ ...inputs, playlistName: e.target.value })
							}
						/>
					</FormControl>
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							Playlist Description (optional)
						</FormLabel>
						<Input
							borderColor="accent.transparent"
							rounded="base"
							outline={0}
							variant="flushed"
							type="text"
							color="zinc.300"
							fontSize="sm"
							value={inputs.playlistDesc}
							onChange={(e) =>
								setInputs({ ...inputs, playlistDesc: e.target.value })
							}
						/>
					</FormControl>
				</Flex>
				<Box mt={5}>
					<Heading fontSize="xl" mb={4} fontWeight={500}>
						Add Songs
					</Heading>
					{favoritesLoading ? (
						<Flex
							w="full"
							align="center"
							color="accent.main"
							justify="center"
							minH="10rem">
							<AiOutlineLoading color="inherit" className="spin" size={36} />
						</Flex>
					) : error.favorites ? (
						<Box my={2}>
							<Text color="zinc.400">Sorry, an error occured</Text>
						</Box>
					) : (
						<>
							<Heading fontSize="md" color="zinc.400" mb={2} fontWeight={400}>
								From Your favorites
							</Heading>
							<Divider h="1px" border={0} bg="gray.800" />
							<SimpleGrid
								templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
								gap={3}
								mt={2}>
								{favorites?.map((song) => (
									<PlaylistSong
										key={song?._id}
										song={song}
										onToggleAdd={() => toggleAddSong(song?._id)}
										isAdded={songIsInPlaylist(song?._id)}
									/>
								))}
							</SimpleGrid>
						</>
					)}
					<Flex align="center" mt={6} justify="space-between">
						<Heading fontSize="md" color="zinc.400" fontWeight={400}>
							From Library
						</Heading>
						<Button
							onClick={() => fetchOtherSongs()}
							disabled={otherSongsLoading}
							_disabled={{ opacity: 0.5, cursor: "disabled" }}
							variant="unstyled"
							size="sm"
							px={4}
							bg="accent.light"
							fontSize="sm"
							rounded="md">
							{otherSongsLoading ? "Refreshing" : "Refresh"}
						</Button>
					</Flex>
					<Divider h="1px" border={0} mt={2} bg="gray.800" />
					{otherSongsLoading ? (
						<Flex
							w="full"
							align="center"
							color="accent.main"
							justify="center"
							minH="10rem">
							<AiOutlineLoading color="inherit" className="spin" size={36} />
						</Flex>
					) : error.otherSongs ? (
						<Box my={2}>
							<Text color="zinc.400">Sorry, an error occured</Text>
						</Box>
					) : (
						<>
							<SimpleGrid
								templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
								gap={3}
								mt={2}>
								{otherSongs?.map((song) => (
									<PlaylistSong
										key={song?._id}
										song={song}
										isAdded={songIsInPlaylist(song?._id)}
										onToggleAdd={() => toggleAddSong(song?._id)}
									/>
								))}
							</SimpleGrid>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default CreatePlaylistPage;
