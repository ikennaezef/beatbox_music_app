import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const ArtisteSong = ({ song }) => {
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
					<Text fontSize="lg">{song?.title}</Text>
					<Text color="zinc.400" fontSize="sm">
						{song?.artistes.join(", ")}
					</Text>
				</Box>
			</Flex>
			<Flex align="center" gap={3} pr={3}>
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
