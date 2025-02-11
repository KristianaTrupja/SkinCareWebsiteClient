/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: 'var(--peach-orange)', // --peach-orange
        rosy: 'var(--rosy-pink)', // --rosy-pink
        lightYellow: 'var(--light-yellow)', // --light-yellow
        goldenYellow: 'var(--golden-yellow)', // --golden-yellow
        softCoral: 'var(--soft-coral)', // --soft-coral
        warmBeige: 'var(--warm-beige)', // --warm-beige
        lightBlush: 'var(--light-blush)', // --light-blush
      },
    },
  },
  plugins: [],
};
