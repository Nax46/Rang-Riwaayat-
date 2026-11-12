/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vermilion: {
          DEFAULT: '#8F3026',
          50: '#FDF3F2',
          100: '#F9E2E0',
          200: '#F2C1BC',
          300: '#E79A93',
          400: '#B44234',
          500: '#8F3026',
          600: '#7B2920',
          700: '#64211A',
          800: '#501A14',
          900: '#3D130F',
        },
        gold: {
          DEFAULT: '#D6A84B',
          50: '#FAF6ED',
          100: '#F4ECD4',
          200: '#EBD8A6',
          300: '#E2C479',
          400: '#D6A84B',
          500: '#B88B2F',
          600: '#966E20',
          700: '#755416',
          800: '#543B0E',
          900: '#3A2708',
        },
        ivory: {
          DEFAULT: '#F6EBDD',
          light: '#FAF5ED',
          dark: '#E8D8C3',
          surface: '#FFFDF9',
        },
        charcoal: {
          DEFAULT: '#24201D',
          light: '#3C3632',
          muted: '#685F59',
          soft: '#8F847D',
        },
        marigold: '#F2994A',
        saffron: '#E65100',
        peacock: '#0D5C75',
        henna: '#5C2C16',
      },
      fontFamily: {
        serif: ['Merriweather', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
        gujarati: ['Noto Sans Gujarati', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 4px 20px -2px rgba(36, 32, 29, 0.08), 0 2px 6px -1px rgba(36, 32, 29, 0.04)',
        'editorial-lg': '0 12px 32px -4px rgba(36, 32, 29, 0.12), 0 4px 12px -2px rgba(36, 32, 29, 0.06)',
        gold: '0 0 15px rgba(214, 168, 75, 0.35)',
      },
    },
  },
  plugins: [],
};

