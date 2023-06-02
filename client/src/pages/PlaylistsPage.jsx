import React from "react";
import PlaylistCard from "../components/PlaylistCard";
import { BiPlus } from "react-icons/bi";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import CreatePlaylistCard from "../components/CreatePlaylistCard";

const PlaylistsPage = () => {
	return (
		<Box p={6} pb={32}>
			<Box>
				<Heading as="h2" fontSize="2xl" mb={2} fontWeight="semibold">
					Playlists
				</Heading>
				<Text>Here are some playlists curated by users.</Text>
			</Box>
			<Grid templateColumns="repeat(5, 1fr)" gap={5} mt={10}>
				<CreatePlaylistCard />
				{[1, 2, 3, 4, 5, 6, 7].map((song) => (
					<PlaylistCard key={song.id} playlist={song} />
				))}
			</Grid>
		</Box>
	);
};

export default PlaylistsPage;
