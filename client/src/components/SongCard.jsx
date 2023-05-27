import React from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";
import {
	setCurrentTrack,
	setPlaying,
	setTrackList,
} from "../redux/slices/playerSlice";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

const SongCard = ({ song }) => {
	const dispatch = useDispatch();
	const { currentTrack, isPlaying } = useSelector((state) => state.player);
	const playSong = () => {
		dispatch(setCurrentTrack(song));
		dispatch(setTrackList([song]));
		dispatch(setPlaying(true));
	};

	const isCurrentTrack = currentTrack?._id === song?._id;

	return (
		<Box
			onClick={playSong}
			cursor="pointer"
			as={motion.div}
			initial="initial"
			animate="animate"
			variants={fadeInUp}
			rounded="lg"
			bg="zinc.900"
			minW="10rem"
			pb={4}
			overflow="hidden"
			role="group">
			<Box h="10rem" mb={4} overflow="hidden" position="relative">
				<Image
					src={song?.coverImage}
					alt={song?.title}
					w="full"
					roundedTop="base"
					transition="0.5s ease"
					_groupHover={{ transform: "scale(1.1)" }}
				/>
				<Box
					_groupHover={{ opacity: 1 }}
					opacity={0}
					transition="0.5s ease"
					display="flex"
					alignItems="center"
					justifyContent="center"
					bg="blackAlpha.700"
					position="absolute"
					top={0}
					left={0}
					w="full"
					h="full">
					<Button
						variant="unstyled"
						display="inline-flex"
						alignItems="center"
						justifyContent="center"
						p={0}
						color="gray.300"
						rounded="full">
						{isPlaying && isCurrentTrack ? (
							<AiFillPauseCircle color="inherit" size={36} />
						) : (
							<AiFillPlayCircle color="inherit" size={36} />
						)}
					</Button>
				</Box>
			</Box>
			<Box px={2}>
				<Heading as="h5" fontSize="base" fontWeight={500}>
					{song?.title}
				</Heading>
				<Text fontSize="sm" color="zinc.400" noOfLines={1}>
					{" "}
					{song?.artistes.join(", ")}{" "}
				</Text>
			</Box>
		</Box>
	);
};

export default SongCard;
