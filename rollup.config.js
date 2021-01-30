const path = require('path');
const babel = require('rollup-plugin-babel');
const serve = require('rollup-plugin-serve');
const alias = require('@rollup/plugin-alias');
const postcss = require('rollup-plugin-postcss');

module.exports = {
    input: path.resolve(__dirname, './src/main.js'),
    output: {
        file: path.resolve(__dirname, './dist/fango.js'),
        name: 'Fan',
        format: 'umd',
        sourcemap: true
    },
    plugins: [
        postcss({
            extensions: ['.css', '.scss']
        }),        
        babel({
            exclude: 'node_modules/'
        }),
        serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        }),
        alias({
            entries: [
                { 
                    find: '@utils',
                    replacement: path.resolve(__dirname, './src/utils/index.js') 
                },
                {
                    find: '@constant',
                    replacement: path.resolve(__dirname, './src/constant/index.js') 
                },
                {
                    find: '@ele',
                    replacement: path.resolve(__dirname, './src/ele') 
                }
            ]
        })
    ]

}