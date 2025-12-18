/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Bricolage Grotesque"', 'sans-serif'],
            },
            colors: {
                background: 'hsl(var(--background) / <alpha-value>)',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',

                primary: {
                    DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                    foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
                    foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
                    foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
                },
                card: {
                    DEFAULT: 'hsl(var(--card) / <alpha-value>)',
                    foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
                    foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
                },
                border: 'hsl(var(--border) / <alpha-value>)',
                input: 'hsl(var(--input) / <alpha-value>)',
                ring: 'hsl(var(--ring) / <alpha-value>)',

                success: 'hsl(var(--success) / <alpha-value>)',
                warning: 'hsl(var(--warning) / <alpha-value>)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
                '2xl': 'var(--radius-2xl)',
            },
            spacing: {
                // Keep the clamps or simplify? Let's keep them as extensions but standardizing on simple usage might be better. 
                // For now, retaining user preference for fluid spacing is respectful, but often conflicts with strict token systems.
                // I will keep them but rely more on standard tw classes (p-4, p-6).
                xs: 'clamp(4px, 1vw, 6px)',
                sm: 'clamp(8px, 2.13vw, 10px)',
                md: 'clamp(16px, 4.26vw, 20px)',
                lg: 'clamp(24px, 6.4vw, 30px)',
                xl: 'clamp(32px, 8.53vw, 40px)',
                '2xl': 'clamp(48px, 12.8vw, 60px)',
            },
            boxShadow: {
                sm: '0 1px 2px rgba(0, 0, 0, 0.03)',
                md: '0 4px 12px rgba(0, 0, 0, 0.05)',
                lg: '0 12px 24px rgba(0, 0, 0, 0.08)',
                modal: '0 24px 48px rgba(0, 0, 0, 0.12)',
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(4px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    'from': { transform: 'translateY(100%)' },
                    'to': { transform: 'translateY(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                slideUp: 'slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            },
        },
    },
    plugins: [],
}
