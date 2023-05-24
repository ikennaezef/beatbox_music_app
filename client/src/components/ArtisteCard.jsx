import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const ArtisteCard = ({ artiste }) => {
	return (
		<Box p={2}>
			<Flex
				align="center"
				justify="center"
				border={2}
				bgGradient="linear(to-t, accent.main, orange.500)"
				p={1}
				w="6.5rem"
				rounded="full">
				<Image
					src={artiste?.image}
					alt={artiste?.name}
					objectFit="cover"
					rounded="full"
					w="6rem"
					h="6rem"
					maxW="full"
				/>
			</Flex>
			<Text fontSize="sm" fontWeight={500} textAlign="center" mt={4}>
				{artiste.name}
			</Text>
		</Box>
	);
};

export default ArtisteCard;
