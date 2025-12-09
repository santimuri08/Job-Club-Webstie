/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk,md}", "./src/_layouts/**/*.njk", "./src/_data/**/*.js"],
  safelist: ["sticky", "top-0", "z-50"],
  theme: {
    extend: {
      colors: {
        // Swiss design color palette - minimal and bold
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.neutral.900"),
            a: {
              color: theme("colors.primary.600"),
              "&:hover": {
                color: theme("colors.primary.700"),
              },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: "-0.025em",
            },
            h2: {
              fontWeight: "600",
              letterSpacing: "-0.025em",
            },
            h3: {
              fontWeight: "600",
            },
            code: {
              color: theme("colors.primary.600"),
              backgroundColor: theme("colors.neutral.100"),
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      }),
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
  ],
};
