/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				accent: "#EE4950",
				accentLight: "#ef6067",
				accentTransparent: "#f77e8464",
			},
			backgroundImage: {
				gradientBg: "url('/gradient_bg.jpg')",
			},
			animation: {
				"fade-up": "fade 0.5s ease-in",
				appear: "appear 1.5s ease",
			},
			keyframes: {
				fade: {
					from: { transform: "translateY(25%)", opacity: 0 },
					to: { transform: "none", opacity: 1 },
				},
				appear: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
		},
	},
	plugins: [],
};
