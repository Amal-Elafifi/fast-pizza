/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: "Roboto, Mono, monospace"
    },
    extend: {
      colors: {
        warm: "#a1a1a1"
      },
      height: {
        screen: "100dvh"
      },
     fontSize: {
        huge: ['80rem', {lineHeight: '1'}]
      }

    },
  },
  plugins: [],
}

