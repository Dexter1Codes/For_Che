/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.03em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.03em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '0.06em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.06em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.07em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.07em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.08em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "cormorantgaramond",
                paragraph: "nunito sans"
            },
            colors: {
                'accent-lavender': '#E6E6FA',
                'accent-blush': '#FADADD',
                'deep-muted': '#5A5A5A',
                destructive: '#e53e3e',
                'destructive-foreground': '#ffffff',
                background: '#FDFBF6',
                secondary: '#F5E6E6',
                foreground: '#4A4A4A',
                'secondary-foreground': '#333333',
                'primary-foreground': '#333333',
                primary: '#D8BFD8'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
