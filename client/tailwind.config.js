// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      thems: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#09bc8a",
              forground: "#ffffff",
            },
            focus: "#09bc8a",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#09bc8a",
              forground: "#ffffff",
            },
            focus: "#09bc8a",
          },
        },
      },
    }),
  ],
};
