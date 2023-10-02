import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gsGreen: "#34A853",
        gsAmber: "#FBBC04",
        gsRed: "#CF3721",
        gsBlue: "#4285F4",
        gsOrange: "#F25C00",
        gsOrchid: "#AC69B0",
        gsGray: "#4A4A4A",
        gsLightGray: "#9B9B9B",
        gsDisabled: "#DFDFDF",
        gsIndigo: "#6b66c8",
      },
      boxShadow: {
        topBar: "0px 2px 6px 0px rgb(74,74,74,0.05)",
        searchBar: "0px 0px 2px 0px rgb(200,200,200,0.5)",
      },
      gridTemplateColumns: {
        movieList: "repeat(auto-fit,minmax(150px,1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
