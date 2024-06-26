import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}"

  ],
  theme: {

    container: {
      center:true,
      screens: {
        sm: '1700px',
      
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lightBeige: "#F0EDD4",
        secondaryColor: "#e0e0dc",
        primaryColor: "#c7ae91",
        lightBlack: "#00000030",
        TopBanner: '#53366e',
      }
    },
  },
  plugins: [],
};
const withMaterialTailwind = withMT(config);

export default withMaterialTailwind;