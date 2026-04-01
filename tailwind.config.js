/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        va: {
          blue: '#003F72',
          red: '#C4262E',
          gold: '#F0AB00',
          gray: '#5B616B',
          lightgray: '#F1F1F1',
          white: '#FFFFFF',
        },
        aquia: {
          navy: '#0A1628',
          blue: '#1E3A5F',
          accent: '#00B4D8',
          light: '#E8F4F8',
        }
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
