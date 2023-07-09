/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#111D57",
        "secondary" : "#157AFE",
        "subtitles" : "#7D85AE",
        "input" : "#F5F7F9",
        "placeholder" : "#D4D8DD",
        "lightblue" : "#E8F5FE"
      }
    },
  },
  plugins: [],
}

