import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': 'var(--brand-bg, #faf9f7)',
        'brand-text': 'var(--brand-text, #1a1a1a)',
        'brand-text-light': 'var(--brand-text-light, #666666)',
        'brand-accent': 'var(--brand-accent, #0ea5e9)',
        'brand-border': 'var(--brand-border, #e5e5e5)',
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        'sm': 'var(--radius-sm, 0.375rem)',
        'md': 'var(--radius-md, 0.5rem)',
        'lg': 'var(--radius-lg, 0.75rem)',
      },
    },
  },
  plugins: [],
}

export default config
