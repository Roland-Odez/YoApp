import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'dark-bg': '#0c1317',
        'light-bg': '#202c33',
      },
      colors: {
        'tab-icon': '#aebac1',
        'primary': '#00A884',
        'light-bg': '#202c33',
        'light-txt': '#8696A0'
      }
    },
  },
  plugins: [],
}
export default config
