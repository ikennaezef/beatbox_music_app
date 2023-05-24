import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import SongCard from "./SongCard";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const SmallSection = ({ title, data }) => {
	return (
		<Box mt={8}>
			<Flex align="center" justify="space-between">
				<Flex align="center" gap={3}>
					<Heading as="h3" fontSize="xl" fontWeight={500}>
						{title}
					</Heading>
					<Box color="accent.main">
						<AiFillPlayCircle size={20} color="inherit" />
					</Box>
				</Flex>
				<Button variant="unstyled" color="accent.light" fontWeight={500}>
					See more
				</Button>
			</Flex>
			<Flex
				align="center"
				overflowX="scroll"
				gap={5}
				mt={3}
				pb={4}
				className="scrollbar_style">
				{data.map((song) => (
					<SongCard key={song.id} song={song} />
				))}
			</Flex>
		</Box>
	);
};

export default SmallSection;
