var path = require('path');

var js_path   = path.resolve(__dirname,'./public/js'),
    jsx_path  = path.resolve(__dirname,'./jsx'),
    sass_path = path.resolve(__dirname,'./sass');


module.exports = {
    entry: {
        main: './public/main.js'
        // others
        // react is treated like a module
//        vendors: ['react']
    },

    output: {
        // [name] => use entry key for each entry
        // [hash]
        // [chunkhash]
        filename: '[name].js',      // output filename
        path: js_path // output dir
    },
    module: {
        loaders: [
            {   test: /\.js[x]?$/,  exclude: ['node_modules'],  loader: 'babel' ,
                query:{ presets:['es2015','react'] }
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
//      no scan this module
//        noParse: [react_path]

    },
    resolve: {
        extensions: ['','.js','.jsx','.json']
//        alias: {
//            'react': react_path
//        }
    },
    plugins: [] // [list of plugin](https://webpack.js.org/plugins)
}

