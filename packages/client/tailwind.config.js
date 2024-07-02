/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    //   fontFamily: {
    //     sans: ["Helvetica Neue", "Arial", "sans-serif"],
    //   },
    //   colors: {},
    //   spacing: {},
  },
  plugins: [],
};
