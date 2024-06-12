import type { Config } from "tailwindcss";

const config: Config = {
  content: [  
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,css,scss}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,css,scss}",
    "./src/styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
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
          300: "rgb(var(--primary-300) / <alpha-value>)"
        },
        secondary: {
          500: "rgb(var(--secondary-500) / <alpha-value>)"
        },
        landscape: {
          400: "rgb(var(--landscape-400) / <alpha-value>)",
          300: "rgb(var(--landscape-300) / <alpha-value>)"
        },
        accent: {
          200: "rgb(var(--accent-200) / <alpha-value>)",
          250: "rgb(var(--accent-250) / <alpha-value>)",
          300: "rgb(var(--accent-300) / <alpha-value>)"
        },
        ash: {
          100: "rgb(var(--ash-100) / <alpha-value>)",
          300: "rgb(var(--ash-300) / <alpha-value>)",
          350: "rgb(var(--ash-350) / <alpha-value>)",
          500: "rgb(var(--ash-500) / <alpha-value>)",
          600: "rgb(var(--ash-600) / <alpha-value>)",
          650: "rgb(var(--ash-650) / <alpha-value>)",
        },
        prompt: {
          info: "rgb(var(--prompt-info) / <alpha-value>)",

        }
      }
    },
  },
  plugins: [],
};
export default config;
