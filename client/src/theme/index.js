import { extendTheme, keyframes } from "@chakra-ui/react";

const colors = {
	zinc: {
		100: "#f4f4f5",
		200: "#e4e4e7",
		300: "#d4d4d8",
		400: "#a1a1aa",
		500: "#71717a",
		600: "#52525b",
		700: "#3f3f46",
		800: "#27272a",
		900: "#18181b",
		950: "#09090b",
	},
	brand: {
		900: "#1a365d",
		800: "#153e75",
		700: "#2a69ac",
	},
	accent: {
		main: "#EE4950",
		light: "#ef6067",
		transparent: "#f77e8464",
	},
};

const fonts = {
	heading: `'Inter', sans-serif`,
	body: `'Inter', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

export default theme;
