import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx,css,scss}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx,css,scss}",
		"./src/styles/**/*.{css,scss}",
	],
	theme: {
		extend: {
			screens: {
				//xl: { max: "1279px" }, // 自定義的 xl 設置
				xl: "1298px",
				lg: "1024px",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				spec: {
					200: "#f0f8ff",
					900: "#0141ff",
				},
				primary: {
					200: "rgb(var(--primary-200) / <alpha-value>)",
					300: "rgb(var(--primary-300) / <alpha-value>)",
				},
				secondary: {
					450: "rgb(var(--secondary-450) / <alpha-value>)",
					500: "rgb(var(--secondary-500) / <alpha-value>)",
					700: "rgb(var(--secondary-700) / <alpha-value>)",
				},
				landscape: {
					300: "rgb(var(--landscape-300) / <alpha-value>)",
					400: "rgb(var(--landscape-400) / <alpha-value>)",
					450: "rgb(var(--landscape-450) / <alpha-value>)",
					500: "rgb(var(--landscape-500) / <alpha-value>)",
				},
				accent: {
					200: "rgb(var(--accent-200) / <alpha-value>)",
					220: "rgb(var(--accent-220) / <alpha-value>)",
					250: "rgb(var(--accent-250) / <alpha-value>)",
					300: "rgb(var(--accent-300) / <alpha-value>)",
				},
				ash: {
					100: "rgb(var(--ash-100) / <alpha-value>)",
					200: "rgb(var(--ash-200) / <alpha-value>)",
					300: "rgb(var(--ash-300) / <alpha-value>)",
					350: "rgb(var(--ash-350) / <alpha-value>)",
					500: "rgb(var(--ash-500) / <alpha-value>)",
					600: "rgb(var(--ash-600) / <alpha-value>)",
					650: "rgb(var(--ash-650) / <alpha-value>)",
					850: "rgb(var(--ash-850) / <alpha-value>)",
					900: "rgb(var(--ash-900) / <alpha-value>)",
				},
				prompt: {
					info: "rgb(var(--prompt-info) / <alpha-value>)",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
