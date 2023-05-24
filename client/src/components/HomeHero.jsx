import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { appear } from "../theme/motionVariants";

const HomeHero = () => {
	return (
		<Box
			as={motion.div}
			initial="initial"
			animate="animate"
			variants={appear}
			h={96}
			rounded="lg"
			pos="relative"
			bgImage="url('/gradient_bg.jpg')"
			bgSize="cover">
			<Flex
				align="flex-end"
				pos="absolute"
				bottom={0}
				left={0}
				w="full"
				h="full"
				p={4}
				pb={6}
				bgGradient="linear(to-t, zinc.900, transparent)">
				<Box w="full">
					<Heading as="h1" fontSize="4xl" fontWeight={600} mb={2}>
						Amazing Playlist
					</Heading>
					<Text w="80%">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos omnis
						nisi.
					</Text>
					<Button bg="zinc.100" color="zinc.800" py={5} px={8} mt={4}>
						Listen Now
					</Button>
				</Box>
			</Flex>
		</Box>
	);
};

export default HomeHero;