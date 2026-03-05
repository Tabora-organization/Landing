import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "float-badge-1": "float-badge-1 3s ease-in-out infinite",
        "float-badge-2": "float-badge-2 4s ease-in-out infinite 0.5s",
        "float-badge-3": "float-badge-3 3.5s ease-in-out infinite 1s",
        "draw-line": "draw-line 1s ease-out both",
        glow: "glow 3s ease-in-out infinite",
        "gradient-x": "gradient-x 4s ease infinite",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-badge-1": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        "float-badge-2": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(-2deg)" },
        },
        "float-badge-3": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "draw-line": {
          from: { strokeDasharray: "0 400" },
          to: { strokeDasharray: "400 0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59,130,246,0)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(59,130,246,0.28)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
