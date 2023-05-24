import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { BiMusic } from "react-icons/bi";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<main>
			<Flex align="center" justify="center" bg="zinc.800" p={4} h="5rem">
				<Flex align="center" justify="center" gap={2}>
					<BiMusic className="text-accent" size={30} />
					<Heading fontWeight="semibold" color="gray.200" fontSize="2xl">
						BeatBox
					</Heading>
				</Flex>
			</Flex>
			<Box bg="zinc.950" h="full">
				<Outlet />
			</Box>
		</main>
	);
};

export default AuthLayout;
