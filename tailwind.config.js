/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'zwav-gray': {
          100: '#424549',
          200: '#36393e',
          300: '#282b30',
          400: '#1e2124'
        },
        'zwav-purple': '#436ebc',
        'zwav-red': '#f00'
      }
    }
  },
  plugins: []
};
