/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		fontFamily: {
		  anta: ['Anta', 'sans-serif'],
		  quick: ['Quicksand', 'sans-serif'],
		  comic: ['Comic Neue', 'sans-serif'],
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		colors: {},
	  },
	},
	plugins: [require('tailwindcss-animate')],
  }
  