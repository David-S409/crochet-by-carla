/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      colors: {
        cream: '#fdf6ee',
        blush: '#f2c4b0',
        sage: '#a8b9a0',
        brown: {
          light: '#c9a87c',
          DEFAULT: '#8b5e3c',
          dark: '#4a2f1a',
        },
      },
    },
  },
  plugins: [],
};
