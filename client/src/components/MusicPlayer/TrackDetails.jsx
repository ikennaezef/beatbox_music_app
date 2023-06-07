import { Flex, Image, Text } from "@chakra-ui/react";

const TrackDetails = ({ track }) => {
	return (
		<Flex align="center" gap={{ base: 2, md: 4 }}>
			<Image
				src={track?.coverImage}
				alt={track?.title}
				objectFit="cover"
				w={{ base: "2rem", md: "3rem" }}
				h={{ base: "2rem", md: "3rem" }}
				rounded="lg"
			/>
			<Flex direction="column" align="flex-start">
				<Text fontSize={{ base: "sm", md: "md" }}>{track?.title}</Text>
				<Text fontSize={{ base: "xs", md: "sm" }} color="zinc.500">
					{track?.artistes.join(", ")}
				</Text>
			</Flex>
		</Flex>
	);
};

export default TrackDetails;
