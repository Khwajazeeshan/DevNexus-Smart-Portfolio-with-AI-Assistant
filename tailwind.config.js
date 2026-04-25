/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-card': 'var(--bg-card)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent': 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'border-color': 'var(--border)',
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      boxShadow: {
        'custom': 'var(--shadow)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        techBlink: 'techBlink 8s ease-in-out infinite',
        liveBlink: 'liveBlink 3s ease-in-out infinite',
        blueBlink: 'blueBlink 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79,70,229,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(79,70,229,0.6)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        techBlink: {
          '0%, 100%': { borderColor: 'var(--border)', boxShadow: 'none', color: 'var(--text-secondary)' },
          '10%': { borderColor: 'rgba(56, 189, 248, 0.6)', boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)', color: 'rgba(56, 189, 248, 1)' },
          '20%': { borderColor: 'var(--border)', boxShadow: 'none', color: 'var(--text-secondary)' },
        },
        liveBlink: {
          '0%, 100%': { color: 'currentColor', filter: 'drop-shadow(0 0 0px rgba(34, 197, 94, 0))' },
          '50%': { color: '#22c55e', filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.9))' },
        },
        blueBlink: {
          '0%, 100%': { color: 'currentColor', filter: 'drop-shadow(0 0 0px rgba(56, 189, 248, 0))' },
          '50%': { color: '#38bdf8', filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.9))' },
        }
      }
    },
  },
  plugins: [],
};
