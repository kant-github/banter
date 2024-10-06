/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
   
	  // Or if using `src` directory:
	  "./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  // Other colors...
		},
		keyframes: {
		  // Custom keyframe for a more subtle pulse animation
		  pulseCustom: {
			'0%, 100%': {
			  opacity: '1',
			},
			'50%': {
			  opacity: '0.9', // Less drastic opacity change
			},
		  },
		},
		animation: {
		  // Custom animation for a smoother, less pronounced pulse
		  pulseCustom: 'pulseCustom 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Increased duration
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  