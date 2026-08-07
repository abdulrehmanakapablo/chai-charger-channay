/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Primary & Surface Tint
        primary: '#9cd2b6',
        'on-primary': '#003826',
        'primary-container': '#174d38',
        'on-primary-container': '#87bda2',
        'surface-tint': '#9cd2b6',
        'inverse-primary': '#346851',

        // Fixed Primaries
        'primary-fixed': '#b7efd2',
        'primary-fixed-dim': '#9cd2b6',
        'on-primary-fixed': '#002114',
        'on-primary-fixed-variant': '#1a503b',

        // Brand Secondary
        secondary: '#ffb3af',
        'on-secondary': '#561e1d',
        'secondary-container': '#753634',
        'on-secondary-container': '#f8a19d',

        // Fixed Secondaries
        'secondary-fixed': '#ffdad7',
        'secondary-fixed-dim': '#ffb3af',
        'on-secondary-fixed': '#3a090a',
        'on-secondary-fixed-variant': '#723432',

        // Tertiary
        tertiary: '#feb4b1',
        'on-tertiary': '#512221',
        'tertiary-container': '#693534',
        'on-tertiary-container': '#e79f9c',

        // Fixed Tertiaries
        'tertiary-fixed': '#ffdad8',
        'tertiary-fixed-dim': '#feb4b1',
        'on-tertiary-fixed': '#360d0e',
        'on-tertiary-fixed-variant': '#6c3736',

        // Error System
        error: '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',

        // Surface System
        surface: '#111412',
        'surface-dim': '#111412',
        'surface-bright': '#373a38',
        'surface-container-lowest': '#0c0f0d',
        'surface-container-low': '#191c1a',
        'surface-container': '#1d201e',
        'surface-container-high': '#282b28',
        'surface-container-highest': '#333533',
        'surface-variant': '#333533',
        'on-surface': '#e1e3df',
        'on-surface-variant': '#c0c9c2',
        'inverse-surface': '#e1e3df',
        'inverse-on-surface': '#2e312f',

        // Background & Outlines
        background: '#111412',
        'on-background': '#e1e3df',
        outline: '#8a938d',
        'outline-variant': '#404944',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['56px', { lineHeight: '64px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'title-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.02em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
        card: '24px',
        element: '12px',
      },
      spacing: {
        unit: '8px',
        'container-max': '1280px',
        gutter: '24px',
        'margin-desktop': '64px',
        'margin-mobile': '20px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
      },
      boxShadow: {
        glass: '0px 10px 30px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};