import React, { useEffect, useRef, useState } from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Flex,
	Image,
	SimpleGrid,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
	TbArrowsShuffle,
	TbPlayerTrackNextFilled,
	TbPlayerTrackPrevFilled,
	TbRepeat,
	TbRepeatOff,
	TbRepeatOnce,
} from "react-icons/tb";
import {
	AiFillPauseCircle,
	AiFillPlayCircle,
	AiOutlineHeart,
} from "react-icons/ai";
import {
	BsFillVolumeUpFill,
	BsSoundwave,
	BsFillVolumeMuteFill,
} from "react-icons/bs";
import {
	nextTrack,
	prevTrack,
	setPlaying,
	toggleRepeat,
} from "../../redux/slices/playerSlice";
import { useNavigate } from "react-router-dom";

const MusicPlayer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const modalRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentTrack, repeatStatus, currentIndex, trackList } = useSelector(
		(state) => state.player
	);
	const { user, token } = useSelector((state) => state.user);
	const audioRef = useRef();

	const isEndOfTracklist = currentIndex === trackList.length - 1;

	const [songDetails, setSongDetails] = useState(null);
	const [isPlaying, setIsPlaying] = useState(
		audioRef.current && audioRef.current.playing
	);

	useEffect(() => {
		setSongDetails((prev) => {
			return { ...prev, time: 0 };
		});
		audioRef.current.currentTime = 0;
		audioRef.current.play();
	}, [currentTrack?._id]);

	useEffect(() => {
		setSongDetails({
			volume: 1,
			time: audioRef?.current
				? Math.round(
						(audioRef?.current.currentTime / audioRef.current.duration) * 100
				  )
				: 0,
			shuffle: false,
			repeat: false,
		});
	}, [audioRef.current]);

	const seekPoint = (e) => {
		audioRef.current.currentTime = (e / 100) * audioRef.current.duration;

		setSongDetails((prev) => ({
			...prev,
			time: Math.round(
				(audioRef.current.currentTime / audioRef.current.duration) * 100
			),
		}));
	};

	const changeVolume = (e) => {
		setSongDetails((prevValues) => {
			return { ...prevValues, volume: e / 100 };
		});
		audioRef.current.volume = e / 100;
	};

	const handlePlayPause = () => {
		if (isPlaying) {
			audioRef?.current.pause();
			dispatch(setPlaying(false));
		} else {
			audioRef?.current.play();
			dispatch(setPlaying(true));
		}
	};

	const volumeToggle = () => {
		if (songDetails?.volume > 0) {
			setSongDetails((prev) => {
				return { ...prev, volume: 0 };
			});
			audioRef.current.volume = 0;
		} else {
			setSongDetails((prev) => {
				return { ...prev, volume: 1 };
			});
			audioRef.current.volume = 1;
		}
	};

	useEffect(() => {
		audioRef.current.currentTime = 0;
		audioRef?.current.play();
	}, [currentTrack.src]);

	const convertToMins = (value) => {
		const mins = Math.floor(value / 60);
		const secs = Math.round(value - mins * 60, 2);
		const formattedSeconds = secs < 10 ? "0" + secs : secs;
		return `${mins}:${formattedSeconds}`;
	};

	const handleNextSong = () => {
		if (trackList.length == 1) {
			restartSong();
		} else {
			dispatch(nextTrack());
		}
	};

	const handlePreviousSong = () => {
		if (trackList.length == 1) {
			restartSong();
		} else {
			dispatch(prevTrack());
		}
	};

	const restartSong = () => {
		setSongDetails((prev) => {
			return { ...prev, time: 0 };
		});
		audioRef.current.currentTime = 0;
		audioRef.current.play();
	};

	const handleEnded = () => {
		switch (repeatStatus) {
			case "OFF":
				if (!isEndOfTracklist) {
					handleNextSong();
				}
				break;
			case "TRACKLIST":
				handleNextSong();
				break;
			case "SINGLE":
				audioRef.current.play();
				break;

			default:
				break;
		}
	};

	const handleLogin = () => {
		navigate("/auth/login");
	};

	const handleLike = () => {
		if (!token) {
			console.log("Not logged in");
		} else {
			console.log("User logged in");
		}
		// onOpen();
	};

	return (
		<>
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={modalRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<AlertDialogOverlay />

				<AlertDialogContent bg="zinc.200">
					<AlertDialogHeader>Not Logged In</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						Please login to save songs to your favorites.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={modalRef} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="red" ml={3} onClick={handleLogin}>
							Login
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<SimpleGrid
				templateColumns="repeat(3, 1fr)"
				align="center"
				justify="space-between"
				position="fixed"
				bottom="0"
				left="0"
				zIndex={100}
				width="full"
				p={4}
				border="1px"
				borderColor="zinc.600"
				roundedTop="lg"
				bgColor="blackAlpha.700"
				backdropFilter="blur(15px)">
				<Flex align="center" gap={4}>
					<Image
						src={currentTrack?.coverImage}
						alt={currentTrack?.title}
						objectFit="cover"
						w="3rem"
						h="3rem"
						rounded="lg"
					/>
					<Flex direction="column" align="flex-start">
						<Text>{currentTrack?.title}</Text>
						<Text fontSize="sm" color="zinc.500">
							{currentTrack?.artistes.join(", ")}
						</Text>
					</Flex>
				</Flex>
				<Flex direction="column" gap={2}>
					<Flex align="center" justify="center" gap={6}>
						<Button
							color="zinc.600"
							variant="unstyled"
							display="inline-flex"
							alignItems="center"
							justifyContent="center">
							<TbArrowsShuffle color="inherit" size={16} />
						</Button>
						<Button
							onClick={handlePreviousSong}
							variant="unstyled"
							display="inline-flex"
							alignItems="center"
							justifyContent="center">
							<TbPlayerTrackPrevFilled size={16} />
						</Button>
						<Button
							onClick={handlePlayPause}
							variant="unstyled"
							color="accent.main"
							p={0}
							display="inline-flex"
							alignItems="center"
							justifyContent="center">
							{!isPlaying ? (
								<AiFillPlayCircle size={46} />
							) : (
								<AiFillPauseCircle size={46} />
							)}
						</Button>
						<Button
							onClick={handleNextSong}
							variant="unstyled"
							display="inline-flex"
							alignItems="center"
							justifyContent="center">
							<TbPlayerTrackNextFilled size={16} />
						</Button>
						<Button
							onClick={() => dispatch(toggleRepeat())}
							color={repeatStatus == "OFF" ? "zinc.600" : "accent.light"}
							variant="unstyled"
							display="inline-flex"
							alignItems="center"
							justifyContent="center">
							{repeatStatus === "OFF" ? (
								<TbRepeatOff color="inherit" size={18} />
							) : repeatStatus === "SINGLE" ? (
								<TbRepeatOnce color="inherit" size={18} />
							) : (
								<TbRepeat color="inherit" size={18} />
							)}
						</Button>
					</Flex>
					<Flex justifyContent="space-between" gap={3}>
						<Text fontSize="xs" color="zinc.500">
							{audioRef.current
								? convertToMins(audioRef.current.currentTime)
								: "0:00"}
						</Text>
						<Slider
							aria-label="seek-slider"
							defaultValue={0}
							width="15rem"
							onChange={seekPoint}
							value={!isNaN(songDetails?.time) ? songDetails?.time : 0}>
							<SliderTrack bg="gray.400">
								<SliderFilledTrack bg="accent.light" />
							</SliderTrack>
							<SliderThumb boxSize={3}>
								<Box color="tomato" as={BsSoundwave} />
							</SliderThumb>
						</Slider>
						<Text fontSize="xs" color="zinc.500">
							{currentTrack?.duration.split(".").join(":")}
						</Text>
					</Flex>
				</Flex>
				<Flex align="center" justify="flex-end" gap={4}>
					<Button variant="unstyled" fontSize={24} onClick={handleLike}>
						<AiOutlineHeart />
					</Button>
					<Flex justifyContent="space-between" gap={0}>
						<Button
							variant="unstyled"
							p={0}
							m={0}
							display="inline-flex"
							boxSize={6}
							onClick={volumeToggle}>
							{songDetails?.volume === 0 ? (
								<BsFillVolumeMuteFill />
							) : (
								<BsFillVolumeUpFill />
							)}
						</Button>

						<Slider
							aria-label="volume-slider"
							width="10rem"
							onChange={changeVolume}
							value={songDetails ? songDetails?.volume * 100 : 0}>
							<SliderTrack bg="gray.400">
								<SliderFilledTrack bg="accent.light" />
							</SliderTrack>
							<SliderThumb boxSize={3} outline={0} />
						</Slider>
						<audio
							ref={audioRef}
							src={currentTrack?.songUrl}
							onPause={() => setIsPlaying(false)}
							onPlay={() => setIsPlaying(true)}
							onEnded={handleEnded}
							onTimeUpdate={() => {
								setSongDetails((prev) => ({
									...prev,
									time: Math.round(
										(audioRef.current.currentTime / audioRef.current.duration) *
											100
									),
								}));
							}}
						/>
					</Flex>
				</Flex>
			</SimpleGrid>
		</>
	);
};

export { MusicPlayer };
