module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        screens:{
          mobile:{min:"300px",max:"600px"},
        },
        colors: {
          white: '#FFFFFF',
          'charcoal-gray': '#333333',
          'soft-pastel-blue': '#A3C4D8',
          coral: '#FF6F61',
          'light-gray': '#F7F7F7',
        },
      },
    },
    plugins: [],
  };