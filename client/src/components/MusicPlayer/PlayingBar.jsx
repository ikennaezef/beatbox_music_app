import {
	Box,
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
} from "@chakra-ui/react";
import { BsSoundwave } from "react-icons/bs";
import { convertToMins } from "../../utils";

const PlayingBar = ({ time, track, onSeek, trackRef }) => {
	return (
		<Flex justifyContent="space-between" gap={3}>
			<Text fontSize="xs" color="zinc.500">
				{trackRef ? convertToMins(trackRef.currentTime) : "0:00"}
			</Text>
			<Slider
				outline={0}
				_focus={{ outline: 0 }}
				aria-label="seek-slider"
				defaultValue={0}
				width="15rem"
				onChange={onSeek}
				value={!isNaN(time) ? time : 0}>
				<SliderTrack bg="gray.400">
					<SliderFilledTrack bg="accent.light" />
				</SliderTrack>
				<SliderThumb boxSize={3} outline={0}>
					<Box color="tomato" as={BsSoundwave} />
				</SliderThumb>
			</Slider>
			<Text fontSize="xs" color="zinc.500">
				{track?.duration.split(".").join(":")}
			</Text>
		</Flex>
	);
};

export default PlayingBar;
