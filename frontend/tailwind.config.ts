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
      colors: {
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
