/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn/ui colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Silen Purple Brand Colors
        purple: {
          50: '#f3f0ff',
          100: '#e9e2ff', 
          200: '#d6ccff',
          300: '#b8a5ff',
          400: '#9575ff',
          500: '#7c56ff', // Light accent
          600: '#6d39ff', // Medium accent
          700: '#5d1df7',
          800: '#4c1d95',
          900: '#3b1464',
          950: '#2a0e4e'
        },
        // Main brand color
        brand: {
          primary: '#9D4EDD', // Main purple
          light: '#C77DFF',   // Light accent
          dark: '#7B2CBF',    // Dark accent
          darker: '#5A189A'   // Darkest
        },
        // Status colors (similar to Wiz)
        status: {
          critical: '#dc2626',    // red-600
          high: '#ea580c',       // orange-600  
          medium: '#ca8a04',     // yellow-600
          low: '#16a34a',        // green-600
          info: '#2563eb'        // blue-600
        },
        // Surface colors (Wiz-inspired)
        surface: {
          primary: '#ffffff',
          secondary: '#f8fafc',  // slate-50
          tertiary: '#f1f5f9',   // slate-100
          border: '#e2e8f0',     // slate-200
          muted: '#94a3b8'       // slate-400
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'card': '0.75rem',
        'button': '0.5rem'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'heading-xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-md': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'elevated': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      },
      borderRadius: {
        'card': '0.75rem',
        'button': '0.5rem'
      }
    },
  },
  plugins: [],
}

