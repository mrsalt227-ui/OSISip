/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // toggled by adding .dark to <html>
  theme: {
    extend: {
      fontFamily: {
        body: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          green: {
            50:  "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            700: "#15803d",
            800: "#166534",
            900: "#14532d",
            950: "#052e16",
          },
          amber: {
            50:  "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
          },
        },
      },
      boxShadow: {
        "glass":      "0 8px 32px rgba(20, 83, 45, 0.08)",
        "card":       "0 2px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 70% 30%, #fef3c7 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #dcfce7 0%, transparent 60%)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "float":         "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out infinite 1s",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
