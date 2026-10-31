/** @type {import('tailwindcss').Config} */
const t = (n) => `rgb(var(--tema-${n}) / <alpha-value>)`;
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        tema: { 100: t(100), 200: t(200), 250: t(250), 300: t(300), 400: t(400), 450: t(450), 500: t(500), 600: t(600), 700: t(700) },
      },
    },
  },
  plugins: [],
};
