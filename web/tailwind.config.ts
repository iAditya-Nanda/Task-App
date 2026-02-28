import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/includes/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FDF7FD', /* Very light pastel bg from SS */
          card: '#FFFFFF',
          textMain: '#1F2937',   /* gray-800 */
          textMuted: '#6B7280',  /* gray-500 */
          textSubtle: '#9CA3AF', /* gray-400 */
          border: '#F3F4F6',     /* gray-100 */
          sidebarActive: '#F3E8FF', /* purple-100 for active sidebar */
          sidebarActiveText: '#111827',
          buttonPrimary: '#000000',
          buttonPrimaryHover: '#222222',
          badgeRed: '#FCE7F3',   /* pink-100 */
          badgeRedText: '#BE185D', /* pink-700 */
          badgePurple: '#F3E8FF', /* purple-100 */
          badgePurpleText: '#7E22CE', /* purple-700 */
          badgeYellow: '#FEF3C7', /* yellow-100 */
          badgeYellowText: '#B45309', /* yellow-700 */
          badgeBlue: '#DBEAFE',   /* blue-100 */
          badgeBlueText: '#1D4ED8', /* blue-700 */
          badgeGreen: '#DCFCE7',  /* green-100 */
          badgeGreenText: '#15803D', /* green-700 */
        }
      },
      fontFamily: {
        sans: ['var(--font-ubuntu)', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        }
      }
    },
  },
  plugins: [],
}

export default config
