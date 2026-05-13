import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1320px",
        "2xl": "1440px",
      },
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1320px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        ink: "#0E0E0E",
        paper: "#F5F1EC",
        accent: {
          DEFAULT: "#5CBA3C",
          hi: "#71D04E",
        },
        concrete: {
          DEFAULT: "#8A8A87",
          text: "#5C5C58",
        },
        rule: {
          ink: "rgba(14,14,14,0.12)",
          paper: "rgba(255,255,255,0.12)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["80px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["64px", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        h1: ["48px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["36px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["24px", { lineHeight: "1.2" }],
        h4: ["20px", { lineHeight: "1.3" }],
        lead: ["22px", { lineHeight: "1.55" }],
        body: ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        eyebrow: ["12px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      spacing: {
        "section-lg": "120px",
        "section-md": "96px",
        "section-sm": "64px",
        "section-lg-m": "72px",
        "section-md-m": "56px",
        "section-sm-m": "40px",
      },
      maxWidth: {
        container: "1320px",
        wide: "1440px",
        reading: "720px",
      },
      borderRadius: {
        card: "4px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(.2,.7,.2,1)",
      },
      animation: {
        "scroll-bounce": "scrollBounce 1.6s ease-in-out infinite",
      },
      keyframes: {
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
