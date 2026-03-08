/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neuomorphic': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neuomorphic-inset': 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
      },
      transitionProperty: {
        'position': 'left, right, width',
      }
    },
  },
  plugins: [],
}

