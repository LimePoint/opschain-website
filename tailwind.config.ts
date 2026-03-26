import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2e8555',
          dark: '#29784c',
          darker: '#277148',
          darkest: '#205d3b',
          light: '#33925d',
          lighter: '#359962',
          lightest: '#3cad6e',
        },
        accent: {
          DEFAULT: '#25c2a0',
          dark: '#21af90',
          light: '#29d5b0',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [],
}

export default config
