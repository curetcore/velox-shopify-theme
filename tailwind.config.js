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
    // Colores
    {
      pattern: /tw-(bg|text|border)-(velox|accent)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    // Grid responsive - clases directas
    'tw-grid-cols-1', 'tw-grid-cols-2', 'tw-grid-cols-3', 'tw-grid-cols-4',
    'sm:tw-grid-cols-1', 'sm:tw-grid-cols-2', 'sm:tw-grid-cols-3', 'sm:tw-grid-cols-4',
    'md:tw-grid-cols-1', 'md:tw-grid-cols-2', 'md:tw-grid-cols-3', 'md:tw-grid-cols-4',
    'lg:tw-grid-cols-1', 'lg:tw-grid-cols-2', 'lg:tw-grid-cols-3', 'lg:tw-grid-cols-4', 'lg:tw-grid-cols-5', 'lg:tw-grid-cols-6',
    // Gap responsive
    'tw-gap-4', 'tw-gap-6', 'tw-gap-8', 'tw-gap-10', 'tw-gap-12', 'tw-gap-16',
    'md:tw-gap-8', 'md:tw-gap-10', 'md:tw-gap-12',
    'lg:tw-gap-8', 'lg:tw-gap-10', 'lg:tw-gap-12', 'lg:tw-gap-16',
    // Flex responsive
    'lg:tw-flex', 'lg:tw-hidden', 'md:tw-flex', 'md:tw-hidden',
    'lg:tw-flex-row', 'lg:tw-justify-between', 'lg:tw-items-start', 'lg:tw-items-center',
    // Width responsive
    'lg:tw-w-1/3', 'lg:tw-w-2/3', 'lg:tw-w-1/4', 'lg:tw-w-3/4', 'lg:tw-w-auto', 'lg:tw-max-w-sm', 'lg:tw-max-w-md',
    'md:tw-w-1/2', 'md:tw-w-1/3', 'md:tw-w-2/3',
    // Margin/Padding responsive
    'lg:tw-mt-0', 'lg:tw-mb-0', 'lg:tw-pt-0', 'lg:tw-pb-0',
    'md:tw-mt-0', 'md:tw-mb-0', 'md:tw-pt-0', 'md:tw-pb-0',
    // Padding
    'tw-py-12', 'tw-py-16', 'tw-py-20', 'md:tw-py-16', 'md:tw-py-20', 'lg:tw-py-16', 'lg:tw-py-20',
    'tw-px-4', 'tw-px-6', 'tw-px-8', 'sm:tw-px-6', 'lg:tw-px-8',
    // Flex shrink
    'lg:tw-flex-shrink-0', 'lg:tw-flex-1',
  ],
}
