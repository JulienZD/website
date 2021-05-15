module.exports = {
  mode: 'jit',
  plugins: [require('@tailwindcss/forms')],
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      body: '12px',
      'body-md': '16px',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '0.5rem'
      },
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: {
          light: '#ffd728',
          DEFAULT: 'var(--color-secondary)',
          dark: '#997415',
        },
      },
      backgroundPosition: {
        'left-center': '-375px center',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: 0},
          '100%': { transform: 'translateY(0px)', opacity: 1}
        },
        slideLeft: {
          '0%': { transform: 'translateX(100px)', opacity: 0},
          '100%': { transform: 'translateX(0px)', opacity: 1}
        }
      },
      animation: {
        slideUp: 'slideUp 1s 0.2s forwards',
        slideLeft: 'slideLeft 1s 0.4s forwards'
      }
    },
    variants: {
      extend: {},
    },
  },
  variants: {
    extend: {
      margin: ['first'],
    },
  },
};
