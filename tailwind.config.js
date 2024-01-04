/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'-gray': '#292929',
				'-error': '#F17373',
				'-success': '#5AE4BB'
			},
			fontFamily: {
				iransans: ['iransans'],
				fedra: ['fedra']
			},
			maxWidth: {
				'100vw': '100vw'
			}
		}
	},
	plugins: [require('daisyui')]
};
