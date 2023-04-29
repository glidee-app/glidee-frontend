/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#232323",
        secondary: "#142270",
      },
      fontFamily: {
        primary: ["'Poppins'", "sans-serif"]
      }
    },
  },
  plugins: [],
}

