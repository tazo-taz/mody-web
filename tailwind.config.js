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
      },
      gridTemplateColumns: {
        "horizontal-tickets-form": "2fr 2fr 2fr 2fr 3fr 3fr"
      }
    },
  },
  plugins: [],
}

