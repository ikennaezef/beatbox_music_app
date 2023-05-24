import React from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";

const HorizontalMusicCard = ({ data }) => {
	return (
		<Box
			as={motion.div}
			initial="initial"
			animate="animate"
			variants={fadeInUp}
			bg="zinc.900"
			p={2}
			rounded="base">
			<Flex align="center" justify="space-between">
				<Flex align="center" gap={4}>
					<Image src="/cover.jpg" alt="album" w={10} h={10} rounded="base" />
					<Box>
						<Heading
							as="h4"
							fontSize="md"
							fontWeight={500}
							color="zinc.200"
							noOfLines={1}>
							Sample Name
						</Heading>
						<Text fontSize="xs" noOfLines={1} color="zinc.400">
							Sample Artist
						</Text>
					</Box>
				</Flex>
				<Flex align="center" gap={3} pr={3}>
					<Text fontSize="sm" color="zinc.400">
						2:33
					</Text>
					<Button variant="unstyled">
						<AiOutlineHeart />{" "}
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default HorizontalMusicCard;
