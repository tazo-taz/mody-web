/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      colors: {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)"
      },
      borderRadius: {
        "primary": "12px"
      },
      borderWidth: {
        "1": "1px"
      }
    },
  },
  plugins: [],
}

