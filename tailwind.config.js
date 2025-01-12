/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        colorGrey: "var(--color-grey-50)",
        colorGrey2: "var(--color-grey-0)",
        borderColor: "var(--color-grey-100)",
        textColor: "var(--color-grey-600)",

        purple: "var(--purple)",
        head: "#5A3D36",
        card: "#f8e5d0",
        para: "#6B4F41",
        hover: "#9a6a5d",
        opselect: "#333333",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"], // Add Bebas Neue font
        openSans: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
