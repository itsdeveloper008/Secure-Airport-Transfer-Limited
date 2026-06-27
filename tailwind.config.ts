import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071A35',
          charcoal: '#121826',
          gold: '#C9A227',
          blue: '#2563EB',
          white: '#FFFFFF',
          gray: '#F3F4F6',
          text: '#1F2937',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-manrope)', 'var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
        'dash-flow': 'dash-flow 4s linear infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'scan-line': 'scan-line 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'particle-drift': 'particle-drift 20s linear infinite',
        marquee: 'marquee 45s linear infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-40' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'scan-line': {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '0.3' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'particle-drift': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
      },
    },
  },
  plugins: [],
};

export default config;
