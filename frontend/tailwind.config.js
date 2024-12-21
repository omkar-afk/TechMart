/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [
    daisyui,
    function ({ addUtilities }) {
      addUtilities({
        '.no-outline': {
          outline: 'none !important',
        },
      });
    },
  ],
};
