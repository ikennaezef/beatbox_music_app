import {
	Box,
	Button,
	Flex,
	Hide,
	Image,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AiFillHeart, AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsSoundwave } from "react-icons/bs";
import LoginModal from "./LoginModal";
import { client } from "../api";
import { setUser } from "../redux/slices/userSlice";
import { setModalMessage } from "../redux/slices/modalSlice";

const ArtisteSong = ({ song, handlePlay }) => {
	const dispatch = useDispatch();
	const { currentTrack, isPlaying } = useSelector((state) => state.player);
	const { user, token } = useSelector((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const modalRef = useRef();
	const toast = useToast();

	const isCurrentTrack = currentTrack?._id === song?._id;

	const playSong = () => {
		handlePlay(song);
	};

	const likeSong = async () => {
		await client
			.patch(`/songs/like/${song?._id}`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(setUser(res.data));
				toast({
					description: "Your favorites have been updated",
					status: "success",
				});
			})
			.catch(() => {
				toast({
					description: "An error occured",
					status: "error",
				});
			});
	};

	const handleLike = () => {
		if (!token) {
			dispatch(
				setModalMessage("Please login to save songs to your favorites.")
			);
			onOpen();
		} else {
			likeSong();
		}
	};

	return (
		<>
			<LoginModal ref={modalRef} onClose={onClose} isOpen={isOpen} />
			<Flex
				align="center"
				justify="space-between"
				py={2}
				px={{ base: 1, md: 3 }}
				w="full"
				bg="zinc.900"
				rounded="lg">
				<Flex gap={{ base: 2, md: 4 }} align="center">
					<Image
						src={song?.coverImage}
						alt={song?.title}
						w={{ base: "3rem", md: "5rem" }}
						h={{ base: "3rem", md: "5rem" }}
						rounded="lg"
						objectFit="cover"
					/>
					<Box>
						<Flex align="center" gap={2}>
							<Text fontSize={{ base: "sm", md: "lg" }}>{song?.title}</Text>
							{isCurrentTrack && (
								<Flex align="center" color="accent.main">
									<BsSoundwave size={20} />
									<Text
										fontSize="xs"
										fontWeight={600}
										color="accent.main"
										ml={2}>
										Playing
									</Text>
								</Flex>
							)}
						</Flex>
						<Text color="zinc.400" fontSize={{ base: "xs", md: "sm" }}>
							{song?.artistes.join(", ")}
						</Text>
					</Box>
				</Flex>
				<Flex align="center" gap={3} pr={3}>
					{isCurrentTrack && isPlaying ? null : (
						<Button
							onClick={playSong}
							variant="unstyled"
							color="accent.light"
							fontSize={{ base: 24, md: 36 }}
							p={0}
							display="inline-flex"
							alignItems="center"
							justifyContent="center">
							<AiFillPlayCircle />
						</Button>
					)}
					<Hide below="md">
						<Text fontSize="sm" color="zinc.400">
							{song?.duration?.split(".")?.join(":")}
						</Text>
					</Hide>
					<Button
						variant="unstyled"
						fontSize={{ base: 18, md: 24 }}
						minW={6}
						color="accent.main"
						onClick={handleLike}>
						{user?.favorites?.includes(song?._id) ? (
							<AiFillHeart color="inherit" />
						) : (
							<AiOutlineHeart color="#ddd" />
						)}
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default ArtisteSong;
