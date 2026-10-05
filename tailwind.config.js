/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ruveron: {
          dark: '#0a1128',
          navy: '#0f172a',
          navyLight: '#1e293b',
          blue: '#1e40af',
          royal: '#2563eb',
          cyan: '#06b6d4',
          cyanLight: '#e0f2fe',
          teal: '#0d9488',
          accent: '#38bdf8',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'glow-royal': '0 0 30px -5px rgba(37, 99, 235, 0.3)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
