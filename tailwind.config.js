/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      extend: {
        colors: {
          primary: '#213F7D',
          secondary: '#545F7D',
          tertiary: '#39CDCC',
          green: '#39CD62',
          yellow: '#E9B200',
          red: '#E4033B',
        },
      },
    },
  },
  plugins: [],
}
