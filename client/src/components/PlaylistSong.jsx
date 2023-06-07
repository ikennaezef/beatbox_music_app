import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";

const PlaylistSong = ({ song, isAdded, onToggleAdd }) => {
	return (
		<Flex
			align="center"
			justify="space-between"
			bg="zinc.900"
			rounded="md"
			p={2}>
			<Flex align="center" gap={2}>
				<Image
					src={song?.coverImage}
					alt={song?.title}
					rounded="sm"
					boxSize="2rem"
				/>
				<Box>
					<Text fontSize="sm">{song?.title}</Text>
					<Text fontSize="xs" color="zinc.600">
						{song?.artistes.join(", ")}
					</Text>
				</Box>
			</Flex>
			<Button
				variant="unstyled"
				color={isAdded ? "green.400" : "accent.light"}
				onClick={onToggleAdd}>
				{isAdded ? (
					<BsCheckCircle color="inherit" size={18} />
				) : (
					<BiPlusCircle color="inherit" size={20} />
				)}
			</Button>
		</Flex>
	);
};

export default PlaylistSong;
