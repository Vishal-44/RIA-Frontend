/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'DM-Serif-display' : ['DM Serif display', 'sans-serif'],
        'Inter' : ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

