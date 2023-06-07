import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ArtisteCard = ({ artiste }) => {
	return (
		<Link to={`/artiste/${artiste?._id}`}>
			<Flex
				direction="column"
				align="center"
				p={2}
				_hover={{ transform: "scale(1.05)" }}
				transition="0.5s ease">
				<Flex
					align="center"
					justify="center"
					bgGradient="linear(to-t, accent.main, orange.500)"
					p={1}
					w={{ base: "4.5rem", md: "6.5rem" }}
					rounded="full">
					<Image
						src={artiste?.image}
						alt={artiste?.name}
						objectFit="cover"
						rounded="full"
						w={{ base: "4rem", md: "6rem" }}
						h={{ base: "4rem", md: "6rem" }}
						maxW="full"
					/>
				</Flex>
				<Text
					fontSize={{ base: "xs", md: "sm" }}
					fontWeight={500}
					textAlign="center"
					mt={4}>
					{artiste?.name}
				</Text>
			</Flex>
		</Link>
	);
};

export default ArtisteCard;
