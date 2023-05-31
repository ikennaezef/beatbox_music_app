import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
	AiFillPauseCircle,
	AiFillPlayCircle,
	AiOutlineHeart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { playTrack, setCurrentTrack } from "../redux/slices/playerSlice";
import { BsSoundwave } from "react-icons/bs";

const ArtisteSong = ({ song, handlePlay }) => {
	const dispatch = useDispatch();
	const { currentTrack, isPlaying } = useSelector((state) => state.player);

	const isCurrentTrack = currentTrack?._id === song._id;

	const playSong = () => {
		handlePlay(song);
	};

	const handlePlayPause = () => {
		// if
	};

	return (
		<Flex
			align="center"
			justify="space-between"
			py={2}
			px={3}
			w="full"
			bg="zinc.900"
			rounded="lg">
			<Flex gap={4} align="center">
				<Image
					src={song?.coverImage}
					alt={song?.title}
					w="5rem"
					h="5rem"
					rounded="lg"
					objectFit="cover"
				/>
				<Box>
					<Flex align="center" gap={2}>
						<Text fontSize="lg">{song?.title}</Text>
						{isCurrentTrack && (
							<Flex align="center" color="accent.main">
								<BsSoundwave size={20} />
								<Text fontSize="xs" fontWeight={600} color="accent.main" ml={2}>
									Playing
								</Text>
							</Flex>
						)}
					</Flex>
					<Text color="zinc.400" fontSize="sm">
						{song?.artistes.join(", ")}
					</Text>
				</Box>
			</Flex>
			<Flex align="center" gap={3} pr={3}>
				{isCurrentTrack && isPlaying ? null : (
					<Button
						onClick={playSong}
						variant="unstyled"
						color="accent.light"
						p={0}
						display="inline-flex"
						alignItems="center"
						justifyContent="center">
						<AiFillPlayCircle size={36} />
					</Button>
				)}
				<Text fontSize="sm" color="zinc.400">
					{song?.duration.split(".").join(":")}
				</Text>
				<Button variant="unstyled" fontSize={24}>
					<AiOutlineHeart />{" "}
				</Button>
			</Flex>
		</Flex>
	);
};

export default ArtisteSong;
