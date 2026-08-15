/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: {
          DEFAULT: '#0a0a0a',
          card: 'rgba(255, 255, 255, 0.02)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        heading: ["'Instrument Serif'", 'Georgia', 'serif'],
        body: ["'Barlow'", 'sans-serif'],
        sans: ["'Barlow'", 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      }
    },
  },
  plugins: [],
}
