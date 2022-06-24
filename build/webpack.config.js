const path = require('path');
const CONFIG = require('./config');
const webpack = require('webpack');

//entryはprojectで適宜変更して下さい
module.exports = {
    entry: {
        summer_camp: CONFIG.PATH.es6 + "summer_camp.es6"
    },
    output: {
        // path: "CONFIG.PATH.js/...",
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: [/\.js$/, /\.es6$/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                /*
                resolveしないとpresetが探せない
                presets: [require.resolve("babel-preset-es2015"), require.resolve("babel-preset-es2016"), require.resolve("babel-preset-es2017")]と同義
                */
                presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)
            }
        }]
    },
    //resolveLoaderも必要
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minify: true
        })
    ],
    devtool: 'inline-source-map',
}
