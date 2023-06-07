import React, { useEffect, useState } from "react";
import { client } from "../api";
import { useParams, Link } from "react-router-dom";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { MdErrorOutline } from "react-icons/md";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import ArtisteSong from "../components/ArtisteSong";
import { useDispatch, useSelector } from "react-redux";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const PlaylistPage = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const { id } = useParams();

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const isUserPlaylist = user?.id === data?.userId;

	const fetchPlaylist = async () => {
		setLoading(true);
		setError(false);
		await client
			.get(`/playlists/${id}`)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchPlaylist();
	}, []);

	const handlePlay = () => {
		dispatch(setTrackList({ list: data?.songs }));
		dispatch(playTrack(data?.songs[0]));
	};

	const onSongPlay = (song) => {
		const index = data?.songs.findIndex((s) => s._id == song._id);

		dispatch(setTrackList({ list: data?.songs, index }));
		dispatch(playTrack(song));
	};

	if (loading) {
		return <LoadingSkeleton />;
	}

	if (error) {
		return (
			<Flex align="center" justify="center" minH="100vh">
				<Flex direction="column" align="center" color="accent.light">
					<MdErrorOutline color="inherit" size={32} />
					<Text color="zinc.400" textAlign="center">
						An error occured
					</Text>
				</Flex>
			</Flex>
		);
	}

	return (
		<Box minH="100vh" p={4} pb={32}>
			<Box pt={6}>
				<Flex align="flex-start" justify="flex-start" gap={5}>
					<Box minWidth="14rem" h="14rem">
						<Image
							src="https://firebasestorage.googleapis.com/v0/b/socialstream-ba300.appspot.com/o/music_app_files%2Fplaylist_cover.jpg?alt=media&token=546adcad-e9c3-402f-8a57-b7ba252100ec"
							alt={data?.title}
							w="full"
							h="full"
							objectFit="cover"
							rounded="lg"
						/>
					</Box>
					<Box>
						<Heading
							as="h5"
							fontSize="xs"
							color="accent.light"
							mb={2}
							fontWeight={400}>
							Playlist
						</Heading>
						<Heading
							as="h1"
							fontSize="3xl"
							color="zinc.100"
							mb={4}
							fontWeight={600}>
							{data?.title}
						</Heading>
						<Text fontSize="sm" color="zinc.400">
							{data?.description}
						</Text>
						{isUserPlaylist && (
							<Link to={`/playlists/edit/${id}`}>
								<Button
									variant="outline"
									leftIcon={<AiFillEdit />}
									size="sm"
									mt={2}
									_hover={{}}>
									Edit
								</Button>
							</Link>
						)}
					</Box>
				</Flex>
				<Box mt={12}>
					<Flex align="center" gap={6} mb={4}>
						<Heading as="h3" fontSize="xl" fontWeight={600}>
							{data?.songs?.length} Songs
						</Heading>
						<Button
							onClick={handlePlay}
							display="inline-flex"
							alignItems="center"
							variant="unstyled"
							bg="accent.light"
							color="white"
							rounded="2rem"
							py={1}
							px={4}
							leftIcon={<BsFillPlayFill size={20} />}>
							Play All
						</Button>
					</Flex>
					<Divider w="full" h="1px" border="0" bg="zinc.600" mb={3} />

					<Flex direction="column" gap={4}>
						{data?.songs?.map((song) => (
							<ArtisteSong
								key={song?._id}
								song={song}
								handlePlay={onSongPlay}
							/>
						))}
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};

export default PlaylistPage;
