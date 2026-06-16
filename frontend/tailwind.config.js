/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        brand: {
          dark: 'var(--brand-dark)',
          base: 'var(--brand-base)',
        },
        feedback: {
          danger: 'var(--feedback-danger)',
          success: 'var(--feedback-success)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          800: 'var(--gray-800)',
          700: 'var(--gray-700)',
          600: 'var(--gray-600)',
          500: 'var(--gray-500)',
          400: 'var(--gray-400)',
          300: 'var(--gray-300)',
          200: 'var(--gray-200)',
          100: 'var(--gray-100)',
        },
        neutral: {
          black: 'var(--neutral-black)',
          white: 'var(--neutral-white)',
        },

        blue: {
          dark: 'var(--blue-dark)',
          base: 'var(--blue-base)',
          light: 'var(--blue-light)',
        },
        purple: {
          dark: 'var(--purple-dark)',
          base: 'var(--purple-base)',
          light: 'var(--purple-light)',
        },
        pink: {
          dark: 'var(--pink-dark)',
          base: 'var(--pink-base)',
          light: 'var(--pink-light)',
        },
        red: {
          dark: 'var(--red-dark)',
          base: 'var(--red-base)',
          light: 'var(--red-light)',
        },
        orange: {
          dark: 'var(--orange-dark)',
          base: 'var(--orange-base)',
          light: 'var(--orange-light)',
        },
        yellow: {
          dark: 'var(--yellow-dark)',
          base: 'var(--yellow-base)',
          light: 'var(--yellow-light)',
        },
        green: {
          dark: 'var(--green-dark)',
          base: 'var(--green-base)',
          light: 'var(--green-light)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
