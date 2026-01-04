
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#1a0b2e', 
          800: '#2d1b4e',
          accent: '#7c3aed'
        }
      }
    },
  },
  plugins: [],
}
