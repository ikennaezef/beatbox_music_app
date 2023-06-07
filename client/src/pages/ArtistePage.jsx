import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import { client } from "../api";
import ArtisteSong from "../components/ArtisteSong";
import { BsFillPlayFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";
import LoadingSkeleton from "../components/LoadingSkeleton";

const ArtistePage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [artiste, setArtiste] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchArtiste = async () => {
		setLoading(true);
		setError(false);
		await client
			.get(`/artistes/${id}`)
			.then((res) => {
				setArtiste(res.data);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchArtiste();
	}, []);

	const handlePlay = () => {
		dispatch(setTrackList({ list: artiste?.songs }));
		dispatch(playTrack(artiste?.songs[0]));
	};

	const onSongPlay = (song) => {
		const index = artiste?.songs.findIndex((s) => s._id == song._id);

		dispatch(setTrackList({ list: artiste?.songs, index }));
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
		<Box minH="100vh" p={4} pb={32} pt={{ base: 16, md: 4 }}>
			<Box pt={6}>
				<Flex
					maxW="full"
					direction={{ base: "column", md: "row" }}
					align="flex-start"
					justify="flex-start"
					gap={5}>
					<Box minWidth="14rem" h="14rem">
						<Image
							src={artiste?.image}
							alt={artiste?.name}
							w="full"
							h="full"
							objectFit="cover"
							rounded="lg"
						/>
					</Box>
					<Box>
						<Heading
							as="h1"
							fontSize={{ base: "lg", md: "3xl" }}
							color="accent.light"
							mb={4}
							fontWeight={600}>
							{artiste?.name}
						</Heading>
						<Text
							fontSize={{ base: "sm", md: "md" }}
							maxW="full"
							color="zinc.300">
							{artiste?.bio}
						</Text>
					</Box>
				</Flex>
				<Box mt={12}>
					<Flex align="center" gap={6} mb={4}>
						<Heading
							as="h3"
							fontSize={{ base: "lg", md: "xl" }}
							fontWeight={600}>
							Songs
						</Heading>
						<Button
							onClick={handlePlay}
							display="inline-flex"
							alignItems="center"
							variant="unstyled"
							bg="accent.light"
							fontSize={{ base: "sm", md: "md" }}
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
						{artiste?.songs?.map((song) => (
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

export default ArtistePage;
