import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Skeleton,
	SkeletonText,
	Text,
} from "@chakra-ui/react";
import { client } from "../api";
import ArtisteSong from "../components/ArtisteSong";
import { BsFillPlayFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";

const ArtistePage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { trackList } = useSelector((state) => state.player);

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
			.catch((err) => {
				console.log("ERROR--->", err);
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchArtiste();
	}, []);

	const handlePlay = () => {
		dispatch(setTrackList(artiste?.songs));
		dispatch(playTrack(artiste?.songs[0]));
	};

	if (loading) {
		return (
			<Box minH="100vh" p={6}>
				<Flex align="flex-start" justify="stretch" gap={6}>
					<Skeleton
						width="18rem"
						height="15rem"
						startColor="zinc.800"
						endColor="zinc.900"
					/>
					<Box w="full">
						<SkeletonText
							noOfLines={1}
							width="15rem"
							skeletonHeight={8}
							mb={5}
							startColor="zinc.800"
							endColor="zinc.900"
						/>
						<SkeletonText
							noOfLines={4}
							spacing="4"
							width="full"
							skeletonHeight="4"
							startColor="zinc.800"
							endColor="zinc.900"
						/>
					</Box>
				</Flex>
				<Box mt={12}>
					<Skeleton
						width="10rem"
						height="2rem"
						startColor="zinc.800"
						endColor="zinc.900"
						mb={8}
					/>
					<SkeletonText
						noOfLines={6}
						spacing="4"
						width="full"
						skeletonHeight="6"
						startColor="zinc.800"
						endColor="zinc.900"
					/>
				</Box>
			</Box>
		);
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
							fontSize="3xl"
							color="accent.light"
							mb={4}
							fontWeight={600}>
							{artiste?.name}
						</Heading>
						<Text fontSize="md" color="zinc.300">
							{artiste?.bio}
						</Text>
					</Box>
				</Flex>
				<Box mt={12}>
					<Flex align="center" gap={6} mb={4}>
						<Heading as="h3" fontSize="xl" fontWeight={600}>
							Songs
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
						{artiste?.songs?.map((song) => (
							<ArtisteSong key={song?._id} song={song} />
						))}
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};

export default ArtistePage;
