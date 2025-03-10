import forms from "@tailwindcss/forms";
import daisyui from "daisyui" 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [forms,daisyui],
};
