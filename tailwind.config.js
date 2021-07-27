const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
	theme: {
    screens: {
			'xs': '300px', 
			...defaultTheme.screens,
    }
  }
};
