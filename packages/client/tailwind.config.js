import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
    extend: {
      colors: {
        malachite: {
          50: "#effef3",
          100: "#d9ffe3",
          200: "#b6fcc9",
          300: "#7df8a0",
          400: "#3deb70",
          500: "#15e553",
          600: "#09b03b",
          700: "#0b8a32",
          800: "#0f6c2b",
          900: "#0e5927",
          950: "#013212",
        },
      },
    },
  },
  plugins: [],
});
