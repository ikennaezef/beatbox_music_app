export const appear = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: { duration: 1, delay: 0.5 },
	},
};

export const fadeInUp = {
	initial: {
		y: 30,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { duration: 1, type: "easeOut" },
	},
};
