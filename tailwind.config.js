/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "popins" : ["Poppins", "sans-serif"]
      },
      colors : {
        primaryDark: "#BA914B",
        primaryLight:"#E0C595",
        primaryGold: "#FFD700",
        secondaryDark: "#575656",
        secondaryLight: "#9D9D9C"
      }
    },
  },
  plugins: [],
}

