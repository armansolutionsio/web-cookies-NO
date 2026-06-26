import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        // Caramelo / dulce de leche — color de acento principal
        caramel: {
          50: '#fdf6ee',
          100: '#f8e6d2',
          200: '#f0cba4',
          300: '#e6ac74',
          400: '#dd9450',
          500: '#d17e36',
          600: '#bd672b',
          700: '#9c5026',
          800: '#7e4125',
          900: '#673722',
        },
        // Cacao / chocolate — fondos cálidos oscuros
        cocoa: {
          50: '#f6f1ec',
          100: '#e7dacd',
          200: '#cdb49b',
          300: '#b08d6b',
          400: '#946d49',
          500: '#75543a',
          600: '#5c4130',
          700: '#433024',
          800: '#2c1f17',
          900: '#1a120c',
        },
      },
      letterSpacing: {
        'ultra': '0.3em',
        'mega': '0.4em',
      },
    },
  },
  plugins: [],
}

export default config
