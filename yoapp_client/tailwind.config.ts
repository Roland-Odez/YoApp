import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '300px',
      'sm': '400px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1240px'
    },
    extend: {
      animation: {
        'rotateLeft': 'rotateLeft .2s linear',
        'rotateLeft2': 'rotateLeft2 .2s linear',
        'scaleImageUp': 'scaleImageUp .4s linear',
        'moveFieldDown': 'moveFieldDown .4s linear',
        'moveNotifyUp': 'moveNotifyUp .5s linear',
        'appear': 'appear 2s easeInOut'
      },
      keyframes: {
        appear: {
          '0%': {
            opacity: '0',
            height: '0px',
            width: '0px'
          },
          '100%': {
            opacity: '1',
            height: '132px',
            width: '220px'
          },
        },
        rotateLeft: {
          '0%': {
            transform: 'rotate(-90deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        },
        rotateLeft2: {
          '0%': {
            transform: 'rotate(90deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        },
        scaleImageUp: {
          '0%': {
            transform: 'scale(0)'   
          },
          '100%': {
            transform: 'scale(1)'
            
          }
        },
        moveFieldDown: {
          '0%': {
            transform: 'translateY(-100px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: '1'
          }
        },
        moveNotifyUp: {
          '0%': {
            transform: 'translateY(100px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: '1'
          }
        }
      },
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
        'primary-two': '#176b5b',
        'primary-three': '#008069',
        'light-bg': '#202c33',
        'lighter-bg': '#202c3340',
        'light-txt': '#8696A0',
        'white-txt': '#E9EDEF',
        'unread-msg': '#D1D7DB',
        'read-msg': '#8696A0',
        'secondary': '#f15c6d',
        'notifybg': '#0b141af5'
      },
      boxShadow: {
        'dark-tab': ''
      }
    },
  },
  plugins: [],
}
export default config

