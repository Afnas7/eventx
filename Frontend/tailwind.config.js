/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Must include JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
