import { BiMenuAltRight, BiMusic } from "react-icons/bi";
import { AiFillHeart, AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { HiOutlineUserCircle, HiViewGrid } from "react-icons/hi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Hide,
	Show,
	Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { resetPlayer } from "../redux/slices/playerSlice";
import { useEffect, useState } from "react";

const MobileNav = () => {
	const [navIsOpen, setNavIsOpen] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		setNavIsOpen(false);
	}, [pathname]);

	const toggleNav = () => {
		setNavIsOpen(!navIsOpen);
	};

	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			zIndex={30}
			w="full"
			h={navIsOpen ? "100vh" : undefined}
			bg="zinc.950">
			<Flex align="center" justify="space-between" p={2}>
				<Link to="/home">
					<Flex color="accent.main" align="center" gap={4}>
						<BiMusic color="inherit" size={30} />

						<Heading as="h1" fontWeight="semibold" fontSize="2xl">
							BeatBox
						</Heading>
					</Flex>
				</Link>
				<Button variant="unstyled" onClick={toggleNav}>
					{navIsOpen ? <TiTimes size={24} /> : <BiMenuAltRight size={24} />}
				</Button>
			</Flex>
			{navIsOpen && (
				<Box px={4} pb={2} h="full">
					<NavContent />
				</Box>
			)}
		</Box>
	);
};

const DesktopNav = () => {
	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			zIndex={30}
			minW={{ base: "full", md: "12rem", lg: "16rem", "2xl": "25rem" }}
			minH={{ base: "5rem", md: "100vh" }}
			borderRight="1px"
			borderRightColor="zinc.600"
			bg="zinc.900">
			<Flex direction="column" minH="100vh" p={4}>
				<Flex color="accent.main" align="center" gap={4}>
					<BiMusic color="inherit" size={30} />
					<Heading as="h1" fontWeight="semibold" fontSize="2xl">
						BeatBox
					</Heading>
				</Flex>
				<NavContent />
			</Flex>
		</Box>
	);
};

const NavContent = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(resetPlayer());
		dispatch(logoutUser());
		navigate("/auth/login");
	};

	const gotoLogin = () => {
		dispatch(resetPlayer());
		navigate("/auth/login");
	};
	return (
		<Box>
			<Flex direction="column" gap={2} mt={12}>
				<NavLink to="/home">
					{({ isActive }) => (
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
					{({ isActive }) => (
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
					{({ isActive }) => (
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
				<NavLink to="/favorites">
					{({ isActive }) => (
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
							<AiFillHeart size={20} />
							<span>Favorites</span>
						</Button>
					)}
				</NavLink>
			</Flex>
			<Divider
				bg="zinc.500"
				border="0"
				mt={{ base: 12, md: 6, lg: 12 }}
				h="1px"
				mb={4}
			/>
			<Box>
				{user ? (
					<Box p={3}>
						<Flex align="center" gap={4} color="accent.light">
							<HiOutlineUserCircle size={20} color="inherit" />
							<Text color="inherit" fontSize="sm">
								{user?.username}
							</Text>
						</Flex>
						<Button
							onClick={handleLogout}
							mt={{ base: 8, md: 4, lg: 8 }}
							variant="unstyled"
							display="inline-flex"
							alignItems="center"
							fontWeight={400}
							gap={3}>
							{" "}
							<AiOutlineLogout size={20} /> Logout
						</Button>
					</Box>
				) : (
					<Button
						onClick={gotoLogin}
						variant="unstyled"
						rounded="base"
						w="full"
						border="1px"
						borderColor="zinc.600"
						fontSize="sm"
						py={2}
						px={5}>
						Login
					</Button>
				)}
			</Box>
		</Box>
	);
};

const Navbar = () => {
	return (
		<>
			<Show above="md">
				<DesktopNav />
			</Show>
			<Hide above="md">
				<MobileNav />
			</Hide>
		</>
	);
};

export default Navbar;
