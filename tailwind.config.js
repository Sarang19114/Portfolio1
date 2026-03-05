/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ['General Sans', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#E4E4E6',
          700: '#D6D9E9',
          600: '#AFB0B6',
          500: '#62646C',
        },
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
      },
      keyframes: {
        'chai-flash': {
          '0%':   { backgroundColor: 'rgba(255,255,255,1)' },
          '25%':  { backgroundColor: 'rgba(255,220,80,0.6)' },
          '100%': { backgroundColor: 'rgba(0,0,0,0)' },
        },
        'chai-pop': {
          '0%':   { transform: 'scale(0.15) rotate(-8deg)', opacity: '0' },
          '55%':  { transform: 'scale(1.12) rotate(3deg)',  opacity: '1' },
          '75%':  { transform: 'scale(0.96) rotate(-1deg)', opacity: '1' },
          '100%': { transform: 'scale(1)    rotate(0deg)',  opacity: '1' },
        },
      },
      animation: {
        'chai-flash': 'chai-flash 0.5s ease-out forwards',
        'chai-pop':   'chai-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
    },
  },
  plugins: [],
};
