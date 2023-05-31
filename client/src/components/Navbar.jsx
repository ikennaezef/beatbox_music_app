import React from "react";
import { BiMusic } from "react-icons/bi";
import { AiFillHeart, AiFillHome } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import { HiOutlineUserCircle, HiViewGrid } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			zIndex={30}
			minW="16rem"
			minH="100vh"
			borderRight="1px"
			borderRightColor="zinc.600"
			bg="zinc.900">
			<Flex direction="column" minH="100vh" p={4}>
				<Flex align="center" gap={4}>
					<BiMusic className="text-accent" size={30} />
					<Heading as="h1" fontWeight="semibold" fontSize="2xl">
						BeatBox
					</Heading>
				</Flex>
				<Flex direction="column" gap={2} mt={12}>
					<NavLink to="/home">
						{({ isActive, isPending }) => (
							<Button
								bg={isActive ? "accent.main" : "transparent"}
								_hover={
									isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
								}
								rounded="base"
								display="inline-flex"
								alignItems="center"
								justifyContent="flex-start"
								gap={6}
								py={6}
								px={4}
								w="full">
								<AiFillHome size={20} />
								<span>Home</span>
							</Button>
						)}
					</NavLink>
					<NavLink to="/library">
						{({ isActive, isPending }) => (
							<Button
								bg={isActive ? "accent.main" : "transparent"}
								_hover={
									isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
								}
								rounded="base"
								display="inline-flex"
								alignItems="center"
								justifyContent="flex-start"
								gap={6}
								w="full"
								py={6}
								px={4}>
								<HiViewGrid size={20} />
								<span>Browse</span>
							</Button>
						)}
					</NavLink>
					<NavLink to="/playlists">
						{({ isActive, isPending }) => (
							<Button
								bg={isActive ? "accent.main" : "transparent"}
								_hover={
									isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
								}
								rounded="base"
								display="inline-flex"
								alignItems="center"
								justifyContent="flex-start"
								gap={6}
								w="full"
								py={6}
								px={4}>
								<BsHeadphones size={20} />
								<span>Playlists</span>
							</Button>
						)}
					</NavLink>
					<Button
						bg="transparent"
						_hover={{ bg: "accent.transparent" }}
						rounded="base"
						display="inline-flex"
						alignItems="center"
						justifyContent="flex-start"
						gap={6}
						w="full"
						py={6}
						px={4}>
						<AiFillHeart size={20} />
						<span>Favorites</span>
					</Button>
				</Flex>
				<Divider bg="zinc.950" mt={12} mb={4} />
				<div>
					<button className="font-medium inline-flex items-center space-x-6 text-zinc-400 py-3 px-4 w-full">
						<HiOutlineUserCircle size={20} />
						<span>Logout</span>
					</button>
				</div>
			</Flex>
		</Box>
	);
};

export default Navbar;
