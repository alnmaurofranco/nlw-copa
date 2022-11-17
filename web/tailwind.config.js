/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif", // #121214
      },
      backgroundImage: {
        fundoapp: 'url("/fundo-copa.png")',
      },
      colors: {
        copa: {
          500: "#129E57",
        },
        nlw: {
          500: "#F7DD43",
          700: "#E5CD3D",
        },
        gray: {
          100: "#E1E1E6",
          300: "#8D8D99",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
      },
    },
  },
  plugins: [],
};
