import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'blue-050': '0 4px 12px rgba(239, 246, 255, 0.6)',
        'blue-100': '0 4px 12px rgba(219, 234, 254, 0.6)', // blue-100
        'blue-200': '0 4px 12px rgba(191, 219, 254, 0.6)', // blue-200
        'blue-300': '0 4px 12px rgba(147, 197, 253, 0.6)', // blue-300
        'blue-400': '0 4px 12px rgba(96, 165, 250, 0.6)',  // blue-400
        'blue-500': '0 4px 12px rgba(59, 130, 246, 0.6)',  // blue-500
      },
      colors:{
        
      }
    },
  },
  plugins: [],
};
export default config;
