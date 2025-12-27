/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        turquoise: {
          50: '#e6fffa',
          100: '#b2fff0',
          200: '#80ffe6',
          300: '#4dffdc',
          400: '#1affd2',
          500: '#00e6c4',
          600: '#00b39e',
          700: '#008078',
          800: '#004d52',
          900: '#001a2c',
        },
        primary: {
          DEFAULT: '#00e6c4',
          dark: '#00b39e',
          light: '#80ffe6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
