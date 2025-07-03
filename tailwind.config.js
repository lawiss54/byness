const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js"
  ],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				darkGreen: {
  					'50': '#e5f2f1',
  					'100': '#cce5e3',
  					'200': '#99cbc7',
  					'300': '#66b1ab',
  					'400': '#338790',
  					'500': '#0f3a37',
  					'600': '#0c2e2c',
  					'700': '#092321',
  					'800': '#061916',
  					'900': '#030e0c'
  				},
  				camel: {
  					'50': '#f9f2ea',
  					'100': '#f3e5d5',
  					'200': '#e6cba9',
  					'300': '#dab17d',
  					'400': '#cd9652',
  					'500': '#c8a376',
  					'600': '#a3764c',
  					'700': '#7d583a',
  					'800': '#573a27',
  					'900': '#322014'
  				},
  				sage: {
  					'50': '#f8fbf7',
  					'100': '#eef6ef',
  					'200': '#ddecdc',
  					'300': '#cbe3ca',
  					'400': '#b9d9b7',
  					'500': '#d5e3ce',
  					'600': '#a6b6a4',
  					'700': '#78897a',
  					'800': '#495c50',
  					'900': '#1b2f26'
  				},
  				ivory: {
  					'50': '#ffffff',
  					'100': '#fcfbf8',
  					'200': '#f9f7f1',
  					'300': '#f5f3ed',
  					'400': '#e1ded5',
  					'500': '#cdcabe',
  					'600': '#a4a398',
  					'700': '#7b7b73',
  					'800': '#52534e',
  					'900': '#292a29'
  				},
  				greenBlack: {
  					'50': '#e3f0ee',
  					'100': '#c7e0dd',
  					'200': '#8fbfb9',
  					'300': '#579e95',
  					'400': '#1f7e71',
  					'500': '#0a1f1c',
  					'600': '#081916',
  					'700': '#061310',
  					'800': '#040d0b',
  					'900': '#020705'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			primary: [
  				'Playfair Display',
  				'serif'
  			],
  			secondary: [
  				'Open Sans',
  				'sans-serif'
  			],
  			playfair: [
  				'Playfair Display',
  				'serif'
  			],
  			'open-sans': [
  				'Open Sans',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [heroui(), require("tailwindcss-animate"), require("@designbycode/tailwindcss-text-shadow")],
}

