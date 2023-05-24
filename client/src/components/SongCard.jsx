import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";

const SongCard = ({ song }) => {
	return (
		<Box
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
			<Box h="10rem" mb={4} overflow="hidden">
				<Image
					src={song?.coverImage}
					alt={song?.title}
					w="full"
					roundedTop="base"
					transition="0.5s ease"
					_groupHover={{ transform: "scale(1.1)" }}
				/>
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
