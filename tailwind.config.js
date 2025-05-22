/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
     container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '768px',
        lg: '1024px',
        xl: '1160px',
        '2xl': '1160px',
      },
    },
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in-out',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

