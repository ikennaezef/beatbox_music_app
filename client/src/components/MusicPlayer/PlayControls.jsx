import { Button, Flex, Hide } from "@chakra-ui/react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import {
	TbArrowsShuffle,
	TbPlayerTrackNextFilled,
	TbPlayerTrackPrevFilled,
	TbRepeat,
	TbRepeatOff,
	TbRepeatOnce,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toggleRepeat } from "../../redux/slices/playerSlice";

const PlayControls = ({
	onNext,
	onPrevious,
	onPlay,
	isPlaying,
	repeatStatus,
}) => {
	const dispatch = useDispatch();
	return (
		<Flex align="center" justify="center" gap={{ base: 2, md: 6 }}>
			<Hide below="md">
				<Button
					color="zinc.600"
					variant="unstyled"
					display="inline-flex"
					alignItems="center"
					justifyContent="center">
					<TbArrowsShuffle color="inherit" size={16} />
				</Button>
			</Hide>
			<Button
				onClick={onPrevious}
				variant="unstyled"
				display="inline-flex"
				alignItems="center"
				justifyContent="center">
				<TbPlayerTrackPrevFilled size={16} />
			</Button>
			<Button
				onClick={onPlay}
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
				onClick={onNext}
				variant="unstyled"
				display="inline-flex"
				alignItems="center"
				justifyContent="center">
				<TbPlayerTrackNextFilled size={16} />
			</Button>
			<Hide below="md">
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
			</Hide>
		</Flex>
	);
};

export default PlayControls;
