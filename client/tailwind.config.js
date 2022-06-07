module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    backgroundColor: theme => ({
      ...theme('colors'),
    }),
    textColor: font => ({
      ...font('colors'),
    }),
    borderColor: border => ({
      ...border('colors'),
    }),
    extend: {
			zIndex: {
				'1': '1',
				'2': '2',
				'3': '3',
				'4': '4',
				'5': '5',
			},
			transitionProperty: {
				'width': 'width'
			},
      maxWidth: {
        '100': '100px',
        '200': '200px',
        '300': '300px',
        '400': '400px',
        '500': '500px'
      }
    },
  },
	corePlugins: {
    maxHeight: true,
	},
  variants: {
    extend: {
      backgroundColor: [
        'even',
        'odd'
      ],
      backgroundOpacity: [
        'even',
        'odd'
      ],
      borderColor: [
        'hover',
        'focus',
        'active'
      ]
    }
  },
  plugins: [],
}
