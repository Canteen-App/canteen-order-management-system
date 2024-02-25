import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#744E15",
        secondary: "#FFF5DC",
      },
      textColor: {
        primary: "#744E15",
        secondary: "#FFF5DC",
      },
      borderColor: {
        primary: "#744E15",
        secondary: "#FFF5DC",
      },
    },
  },
  plugins: [],
};
export default config;
