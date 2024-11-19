import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0CFC3',
        primary: '#4D6055',
        secondary: '#669B90',
        accent: '#B47B77',
        foreground: '#4D6055',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        title: ['Century Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;