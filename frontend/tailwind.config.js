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
        animation:{
          slideIn: 'slideIn 0.5s ease-in-out',
          slideOut: 'slideOut 0.5s ease-in-out',
          fadeIn: 'fadeIn 0.5s ease-in-out',
          fadeOut: 'fadeOut 0.5s ease-in-out',
        },
        keyframes: {
          slideIn: {
            '0%': { transform: 'translateX(-100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          slideOut: {
            '0%': { transform: 'translateX(0)', opacity: '1' },
            '100%': { transform: 'translateX(100%)', opacity: '0' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          fadeOut: {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          }
      }
    },
  },
    plugins: [],
  };