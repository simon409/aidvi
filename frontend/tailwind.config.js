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
        "lightblue" : "#E8F5FE",
        "lighterblue" : "#F4FCFD",
        "hover" : "#111D57"
      },
      container: {
        // you can configure the container to be centered
        center: true,
  
        // default breakpoints but with 40px removed
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1100px',
          '2xl': '100px',
        },
      },
    },
  },
  plugins: [],
}

