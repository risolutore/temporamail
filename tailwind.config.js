/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hacker-bg': '#0a0e27',
        'hacker-surface': '#151b3d',
        'hacker-accent': '#00ff88',
        'hacker-secondary': '#00d4ff',
        'hacker-danger': '#ff0055',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
