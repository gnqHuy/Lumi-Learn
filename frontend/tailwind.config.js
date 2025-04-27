/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      keyframes: {
        slideUpToHalf: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        }
      },
      animation: {
        slideUpToHalf: 'slideUpToHalf 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}

