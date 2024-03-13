/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        body: 'Inter_400Regular',
        subtitle: 'Inter_500Medium',
        heading: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
      },
    },
  },
  plugins: [],
}
