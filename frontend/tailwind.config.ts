import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', "Montserrat", "sans-serif"],
        cabin: ['var(--font-cabin)', "Cabin", "sans-serif"]
      },
      colors: {
        "primary-material": {
          DEFAULT: "#28638a", // rgb(40 99 138) light
          dark: "#96cdf8" // rgb(150 205 248) dark
        },
        "primary-tint": {
          DEFAULT: "#28638a", // rgb(40 99 138) light
          dark: "#96cdf8" // rgb(150 205 248) dark
        },
        "on-primary": {
          DEFAULT: "#ffffff", // rgb(255 255 255) light
          dark: "#00344f" // rgb(0 52 79) dark
        },
        "primary-container": {
          DEFAULT: "#cae6ff", // rgb(202 230 255) light
          dark: "#004b70" // rgb(0 75 112) dark
        },
        "on-primary-container": {
          DEFAULT: "#001e30", // rgb(0 30 48) light
          dark: "#cae6ff" // rgb(202 230 255) dark
        },
        "secondary-material": {
          DEFAULT: "#50606e", // rgb(80 96 110) light
          dark: "#b7c9d9" // rgb(183 201 217) dark
        },
        "on-secondary": {
          DEFAULT: "#ffffff", // rgb(255 255 255) light
          dark: "#22323f" // rgb(34 50 63) dark
        },
        "secondary-container": {
          DEFAULT: "#d3e5f6", // rgb(211 229 246) light
          dark: "#384956" // rgb(56 73 86) dark
        },
        "on-secondary-container": {
          DEFAULT: "#0c1d29", // rgb(12 29 41) light
          dark: "#d3e5f6" // rgb(211 229 246) dark
        },
        tertiary: {
          DEFAULT: "#65587b", // rgb(101 88 123) light
          dark: "#cfc0ea" // rgb(207 192 232) dark
        },
        "on-tertiary": {
          DEFAULT: "#ffffff", // rgb(255 255 255) light
          dark: "#362b4a" // rgb(54 43 74) dark
        },
        "tertiary-container": {
          DEFAULT: "#ebddff", // rgb(235 221 255) light
          dark: "#4d4162" // rgb(77 65 98) dark
        },
        "on-tertiary-container": {
          DEFAULT: "#201634", // rgb(32 22 52) light
          dark: "#ebddff" // rgb(235 221 255) dark
        },
        error: {
          DEFAULT: "#ba1a1a", // rgb(186 26 26) light
          dark: "#ffb4ab" // rgb(255 180 171) dark
        },
        "on-error": {
          DEFAULT: "#ffffff", // rgb(255 255 255) light
          dark: "#690005" // rgb(105 0 5) dark
        },
        "error-container": {
          DEFAULT: "#ffdada", // rgb(255 218 214) light
          dark: "#93000a" // rgb(147 0 10) dark
        },
        "on-error-container": {
          DEFAULT: "#410002", // rgb(65 0 2) light
          dark: "#ffdada" // rgb(255 218 214) dark
        },
        "background-material": {
          DEFAULT: "#f7f9ff", // rgb(247 249 255) light
          dark: "#101417" // rgb(16 20 23) dark
        },
        "on-background": {
          DEFAULT: "#181c20", // rgb(24 28 32) light
          dark: "#e0e3e8" // rgb(224 227 232) dark
        },
        surface: {
          DEFAULT: "#f7f9ff", // rgb(247 249 255) light
          dark: "#101417" // rgb(16 20 23) dark
        },
        "on-surface": {
          DEFAULT: "#181c20", // rgb(24 28 32) light
          dark: "#e0e3e8" // rgb(224 227 232) dark
        },
        "surface-container-low": {
          DEFAULT: "#f1f4f9",
          dark: "#181c20" 
        },
        "surface-container": {
          DEFAULT: "#ebeef3",
          dark: "#1c2024"
        },
        "surface-container-high": {
          DEFAULT: "#e5e8ed",
          dark: "#262a2e"
        },
        "surface-container-highest": {
          DEFAULT: "#e0e3e8",
          dark: "#313539"
        },
        outline: {
          DEFAULT: "#72787e", // rgb(114 120 126) light
          dark: "#8b9198" // rgb(139 145 152) dark
        },
        "outline-variant": {
          DEFAULT: "#c1c7ce", // rgb(139 145 152) light
          dark: "#41474d" // rgb(114 120 126) dark
        },
        shadow: {
          DEFAULT: "#000000", // rgb(0 0 0) light
          dark: "#000000" // rgb(0 0 0) dark
        },
        "cod-gray": {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#0d0d0d"
        },
        "brink-pink": {
          "50": "#fff1f4",
          "100": "#ffe3e9",
          "200": "#ffccda",
          "300": "#ffa1bc",
          "400": "#ff6392",
          "500": "#f93a79",
          "600": "#e71766",
          "700": "#c30d55",
          "800": "#a30e4e",
          "900": "#8b1049",
          "950": "#4e0324"
        },
        malibu: {
          "50": "#f0f8ff",
          "100": "#e1f0fd",
          "200": "#bce0fb",
          "300": "#7fc8f8",
          "400": "#3eaef2",
          "500": "#1593e2",
          "600": "#0874c1",
          "700": "#085d9c",
          "800": "#0b4f81",
          "900": "#0f426b",
          "950": "#0a2a47"
        },
        "energy-yellow": {
          "50": "#fefce8",
          "100": "#fff9c2",
          "200": "#fff089",
          "300": "#ffe45e",
          "400": "#fdcc12",
          "500": "#ecb206",
          "600": "#cc8902",
          "700": "#a36105",
          "800": "#864c0d",
          "900": "#723e11",
          "950": "#431f05"
        },
        alabaster: {
          "50": "#f9f9f9",
          "100": "#efefef",
          "200": "#dcdcdc",
          "300": "#bdbdbd",
          "400": "#989898",
          "500": "#7c7c7c",
          "600": "#656565",
          "700": "#525252",
          "800": "#464646",
          "900": "#3d3d3d",
          "950": "#292929"
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
