/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "poppins" : ["Poppins", "sans-serif"],
        "roboto" : ["Roboto", "sans-serif"]
      },
      colors : {
        primaryDark: "#B98807",
        primaryLight:"#DAAB2D",
        primaryGold: "#FFC812",
        secondaryDark: "#6D6A75",
        secondaryLight: "#BFBDC1",
        primaryText: "#1f2937"
      }
    },
  },
  plugins: [],
}

