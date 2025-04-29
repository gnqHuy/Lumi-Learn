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
        }, 
        slideLeftFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0%)', opacity: '1' },
        }, 
        slideRightFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0%)', opacity: '1' },
        }, 
        slideChangeTheme: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '100%': { transform: 'translateY(70vh)', opacity: '1' },
        }
      },
      animation: {
        slideUpToHalf: 'slideUpToHalf 0.5s ease-out forwards',
        slideLeftFromRight: 'slideLeftFromRight 0.5s ease-out forwards',
        slideRightFromLeft: 'slideRightFromLeft 0.5s ease-out forwards',
        slideChangeTheme: 'slideChangeTheme 0.5s ease-out forwards'
      }
    },
  },
  plugins: [],
}

