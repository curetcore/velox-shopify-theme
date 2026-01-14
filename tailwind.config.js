/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-', // Evita conflictos con CSS de Shopify
  content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.liquid',
    './blocks/**/*.liquid',
  ],
  theme: {
    screens: {
      'sm': '750px',   // Breakpoints de Shopify
      'md': '990px',
      'lg': '1200px',
      'xl': '1400px',
    },
    extend: {
      colors: {
        // Colores de marca Velox
        'velox': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Colores para moda/zapatería
        'accent': {
          DEFAULT: '#dc2626', // Rojo para CTAs
          hover: '#b91c1c',
        },
      },
      fontFamily: {
        'display': ['var(--font-display)', 'system-ui', 'sans-serif'],
        'body': ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  // Safelist para clases dinámicas en Liquid
  safelist: [
    'tw-hidden',
    'tw-block',
    'tw-flex',
    'tw-grid',
    'tw-opacity-0',
    'tw-opacity-100',
    {
      pattern: /tw-(bg|text|border)-(velox|accent)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
  ],
}
