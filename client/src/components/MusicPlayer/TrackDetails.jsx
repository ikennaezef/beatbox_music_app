import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const TrackDetails = ({ track }) => {
	return (
		<Flex align="center" gap={4}>
			<Image
				src={track?.coverImage}
				alt={track?.title}
				objectFit="cover"
				w="3rem"
				h="3rem"
				rounded="lg"
			/>
			<Flex direction="column" align="flex-start">
				<Text>{track?.title}</Text>
				<Text fontSize="sm" color="zinc.500">
					{track?.artistes.join(", ")}
				</Text>
			</Flex>
		</Flex>
	);
};

export default TrackDetails;
