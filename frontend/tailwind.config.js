/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary: "#b27f44",
        secondary: "#616d3c",
        accent: "#bf986c",
        dark: "#354b23",
        darkAccent: "#003d32",
        light: "#ffffff",
      }
    },
  },
  plugins: [],
}

