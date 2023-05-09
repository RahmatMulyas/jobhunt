module.exports = {
  prefix: "tw-",
  important: true,
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      //Color
      colors: {
        primary: "#128ECC",
        secondary: "#FAFFF6",
        tertiary: "#85D5D9",
      },
      //Font
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1440px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
