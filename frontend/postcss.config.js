// postcss.config.js
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // Other PostCSS plugins if needed
        {
            'postcss-preset-mantine': {},
            'postcss-simple-vars': {
                variables: {
                    'mantine-breakpoint-xs': '36em',
                    'mantine-breakpoint-sm': '48em',
                    'mantine-breakpoint-md': '62em',
                    'mantine-breakpoint-lg': '75em',
                    'mantine-breakpoint-xl': '88em',
                },
            }
        }
    ],
};
