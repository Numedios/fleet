/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        smaller: '490px', // Ajouter la taille d'écran personnalisée
      },
      backgroundImage: {
        'gradient-instagram': 'linear-gradient(45deg, #f58529, #e1306c)',
        'gradient-tiktok': 'linear-gradient(45deg, #00f2ea, #ff0050)',
        'gradient-twitter': 'linear-gradient(45deg, #1da1f2, #00a9d1)',
        'gradient-youtube': 'linear-gradient(45deg, #ff0000, #ff5e00)',
      },
      backgroundColor: {
        'primary': '#0E2235', // Couleur de fond primaire personnalisée
        'secondary': '#08131E', // Couleur secondaire personnalisée
      },
    },
  },
  plugins: [],
};
