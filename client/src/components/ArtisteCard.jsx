import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const ArtisteCard = ({ artiste }) => {
	return (
		<Link to={`/artiste/${artiste._id}`}>
			<Flex
				direction="column"
				align="center"
				p={2}
				_hover={{ transform: "scale(1.05)" }}
				transition="0.5s ease">
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
			</Flex>
		</Link>
	);
};

export default ArtisteCard;
