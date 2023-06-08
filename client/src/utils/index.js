export const convertToMins = (value) => {
	const mins = Math.floor(value / 60);
	const secs = Math.round(value - mins * 60, 2);
	const formattedSeconds = secs < 10 ? "0" + secs : secs;
	return `${mins}:${formattedSeconds}`;
};

export const truncateText = (text, length) => {
	if (text.length > length) {
		return text.slice(0, length) + "...";
	} else return text;
};
