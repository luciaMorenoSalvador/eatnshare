/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: colors.trueGray
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: 0
                    },
                    '100%': {}
                },
                'fade-in-up': {
                    '0%': {
                        transform: 'translate(0, 30%)',
                        opacity: 0.5
                    },
                    '100%': {}
                }
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-in-out',
                'fade-in-up': 'fade-in-up 0.2s ease-in-out'
            }
        },
    },
    variants: {
        extend: {
        },
    },
    plugins: [],
}
