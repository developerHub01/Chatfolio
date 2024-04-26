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
      themes: {
        dark: {
          colors: {
            background: {
              50: "#f4f2f0",
              100: "#dad9d8",
              200: "#c1bebd",
              300: "#aba5a1",
              400: "#958b85",
              500: "#7b716a",
              600: "#605954",
              700: "#443f3d",
              800: "#292624",
              900: "#0f0c0b",
            },
            foreground: {
              50: "#f0f2f4",
              100: "#d6d8da",
              200: "#bbbec2",
              300: "#9ea5ac",
              400: "#818b95",
              500: "#68727d",
              600: "#515860",
              700: "#3b3f44",
              800: "#232629",
              900: "#0b0d0f",
            },
            primary: {
              50: "#d9f8ff",
              100: "#ace6ff",
              200: "#7bd4ff",
              300: "#49c3ff",
              400: "#1ab1ff",
              500: "#0098e6",
              600: "#0076b4",
              700: "#005482",
              800: "#003451",
              900: "#001221",
              DEFAULT: "#00a6fb",
              foreground: "#ffffff",
            },
            focus: "#00a6fb",
          },
        },
        light: {
          colors: {
            background: {
              50: "#0a0b10",
              100: "#1f212b",
              200: "#343748",
              300: "#494e65",
              400: "#5e6483",
              500: "#777d9b",
              600: "#959ab0",
              700: "#b4b7c5",
              800: "#d2d4dc",
              900: "#eff1f5",
            },
            foreground: {
              50: "#0b0d0f",
              100: "#232629",
              200: "#3b3f44",
              300: "#515860",
              400: "#68727d",
              500: "#818b95",
              600: "#9ea5ac",
              700: "#bbbec2",
              800: "#d6d8da",
              900: "#f0f2f4",
            },
            primary: {
              50: "#d9f8ff",
              100: "#ace6ff",
              200: "#7bd4ff",
              300: "#49c3ff",
              400: "#1ab1ff",
              500: "#0098e6",
              600: "#0076b4",
              700: "#005482",
              800: "#003451",
              900: "#001221",
              DEFAULT: "#00a6fb",
              foreground: "#ffffff",
            },
            focus: "#00a6fb",
          },
        },
      },
    }),
  ],
};

/* 
"purple-dark": {
  extend: "dark",
  colors: {
    background: "#000814",
    foreground: "#ECEDEE",
    primary: {
      50: "#3B096C",
      100: "#520F83",
      200: "#7318A2",
      300: "#9823C2",
      400: "#c031e2",
      500: "#DD62ED",
      600: "#F182F6",
      700: "#FCADF9",
      800: "#FDD5F9",
      900: "#FEECFE",
      DEFAULT: "#DD62ED",
      foreground: "#ffffff",
    },
    focus: "#F182F6",
  },
}, 
*/
