// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Baby Blue & Silver Palette
        babyBlue: {
          light: '#eff6ff', // Super soft blue for backgrounds
          DEFAULT: '#89cff0', // Classic baby blue
          dark: '#5ab0db',  // Hover state baby blue
        },
        silver: {
          light: '#f8fafc', // Soft off-white grey
          DEFAULT: '#cbd5e1', // Classic silver border color
          dark: '#94a3b8',  // Deep silver for text/icons
        },
        grey: {
          charcoal: '#334155', // Readable dark grey for headings
          slate: '#64748b',    // Medium grey for labels and descriptions
        }
      },
    },
  },
  plugins: [],
}