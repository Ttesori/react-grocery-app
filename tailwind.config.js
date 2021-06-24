module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)'
        },
        neutral: {
          light: 'var(--color-neutral-lt)',
          DEFAULT: 'var(--color-neutral)',
          dark: 'var(--color-neutral-dk)'
        },
      }
    }

  },
  variants: {
    extend: {},
  },
  plugins: [],
}