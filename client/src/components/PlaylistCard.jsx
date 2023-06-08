import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeInUp } from "../theme/motionVariants";

const PlaylistCard = ({ playlist }) => {
	return (
		<Link to={`/playlists/${playlist?._id}`}>
			<Box
				rounded="md"
				bg="zinc.900"
				minW={{ base: "8rem", md: "10rem" }}
				maxW={{ base: undefined, md: "12rem" }}
				p={2}
				pb={4}
				as={motion.div}
				variants={fadeInUp}
				initial="initial"
				animate="animate">
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
					<Heading
						fontWeight={500}
						mb={2}
						fontSize={{ base: "sm", md: "md" }}
						noOfLines={1}>
						{playlist?.title}
					</Heading>
					<Text
						fontSize={{ base: "xs", md: "sm" }}
						color="zinc.500"
						noOfLines={1}>
						{playlist?.userName}
					</Text>
				</Box>
			</Box>
		</Link>
	);
};

export default PlaylistCard;
