/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: {
        '350px': '350px',
        56: '14rem'
      },
      maxWidth: {
        72: '18rem',
        56: '14rem'
      },
      borderColor: {
        'primary-grey': 'rgb(60,64,67)'
      }
    }
  },
  plugins: [],
  important: true,
  corePlugins: {
    preflight: false
  }
}
