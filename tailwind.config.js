/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 7 row grid
        '7': 'repeat(7, minmax(0, 1fr))',
      },
      gridRowEnd: {
        '8': '8',
      },
      height: {
        '9/10': '90vh',
      }
    },
    fontFamily: {
      // Comma-delimited format:
      'apple-system': 'BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    }
  },
  plugins: [],
}

