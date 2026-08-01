import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {


      colors: {
        // AiS brand palette — matched to logo (dark forest green + bright leaf green)
        ink: {
          DEFAULT: "#141A18",
          soft: "#23302C",
          muted: "#5A6B66",
        },
        cream: {
          DEFAULT: "#F7FBF6",
          warm: "#EEF4EC",
          deep: "#DDE8DA",
        },
        // Dark AiS green (primary) — from logo slash & "S"
        teal: {
          50: "#E8F2EF",
          100: "#C6DDD6",
          200: "#9CC1B7",
          500: "#2E7B66",
          600: "#1F6B5E",
          700: "#175548", // primary brand
          800: "#103E35",
          900: "#082823",
        },
        // Bright leaf green (accent) — from logo leaf
        terra: {
          50: "#F1FAEB",
          100: "#DEF3D0",
          200: "#C0E6A5",
          400: "#8DD267",
          500: "#7CC242", // accent (leaf green)
          600: "#65A632",
          700: "#4F8526",
        },
        // Warm gold highlight (subtle, for ratings/luxe touches)
        sand: {
          100: "#FAF2DE",
          300: "#EBC97A",
          500: "#D4A93F",
        },
      },


      opacity: {
        "8": "0.08",
        "12": "0.12",
        "15": "0.15",
      },

      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.625rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")",
        "radial-warm":
          "radial-gradient(ellipse at top, rgba(124,194,66,0.16), transparent 60%), radial-gradient(ellipse at bottom right, rgba(23,85,72,0.18), transparent 55%)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(23,85,72,0.05), 0 8px 24px -8px rgba(23,85,72,0.14)",
        lift: "0 4px 6px rgba(23,85,72,0.05), 0 20px 50px -20px rgba(23,85,72,0.28)",
        glow: "0 0 0 1px rgba(124,194,66,0.3), 0 8px 32px -8px rgba(124,194,66,0.4)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "slow-zoom": "slowZoom 18s ease-in-out infinite alternate",
        "marquee": "marquee 40s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
