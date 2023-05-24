import React from "react";
import HorizontalMusicCard from "./HorizontalMusicCard";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { appear } from "../theme/motionVariants";

const TopCharts = () => {
	return (
		<Box
			bg="zinc.800"
			rounded="base"
			as={motion.div}
			initial="initial"
			animate="animate"
			variants={appear}
			p={4}>
			<Heading as="h3" fontSize="lg" fontWeight={500} mt={2} mb={6}>
				Top Charts
			</Heading>
			<Flex direction="column" gap={2}>
				{[1, 2, 3, 4, 5, 6].map((music) => (
					<HorizontalMusicCard data={music} key={music} />
				))}
			</Flex>
		</Box>
	);
};

export default TopCharts;
