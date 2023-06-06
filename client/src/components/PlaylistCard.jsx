import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
	return (
		<Link to={`/playlists/${playlist?._id}`}>
			<Box className="rounded bg-zinc-900 min-w-[10rem] max-w-[12rem] p-2 pb-4 animate-fade-up">
				<Image
					src="https://firebasestorage.googleapis.com/v0/b/socialstream-ba300.appspot.com/o/music_app_files%2Fplaylist_cover.jpg?alt=media&token=546adcad-e9c3-402f-8a57-b7ba252100ec"
					alt={playlist?.title}
					w="full"
					objectFit="cover"
					rounded="md"
					mb={4}
					loading="lazy"
					minH="100px"
				/>
				<Box>
					<Heading fontWeight={500} mb={2} fontSize="md">
						{playlist?.title}
					</Heading>
					<Text fontSize="sm" color="zinc.500">
						{playlist?.userName}
					</Text>
				</Box>
			</Box>
		</Link>
	);
};

export default PlaylistCard;
