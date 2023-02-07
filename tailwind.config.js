/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0f0f0f',
        white: '#f1f1f1',
        light: 'rgba(255, 255, 255, 0.1)',
        darkGrey: '#272727',
        grey: '#aaaaaa',
      },
      fontFamily: {
        noto: ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
