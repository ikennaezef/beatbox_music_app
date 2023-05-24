import React from "react";
import { songs } from "./HomePage";
import PlaylistCard from "../components/PlaylistCard";
import { BiPlus } from "react-icons/bi";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";

const PlaylistsPage = () => {
	return (
		<Box p={6}>
			<Box>
				<Heading as="h2" fontSize="2xl" mb={2} fontWeight="semibold">
					Playlists
				</Heading>
				<Text>Here are some playlists curated by users.</Text>
			</Box>
			<Grid templateColumns="repeat(5, 1fr)" gap={5} mt={10}>
				<Flex
					direction="column"
					align="center"
					justify="center"
					bg="zinc.800"
					rounded="base">
					<Button
						variant="unstyled"
						bg="zinc.700"
						display="inline-flex"
						alignItems="center"
						rounded="base"
						boxSize="4rem"
						mb={3}>
						<BiPlus size={24} />
					</Button>
					<Text fontSize="sm" color="zinc.400">
						Create a playlist
					</Text>
				</Flex>
				{songs.map((song) => (
					<PlaylistCard key={song.id} playlist={song} />
				))}
			</Grid>
		</Box>
	);
};

export default PlaylistsPage;
