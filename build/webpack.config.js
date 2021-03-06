const CONFIG = require("./config").default;
const path = require("path");
const webpack = require("webpack");

//entryは案件ごとに適宜追加してください
module.exports = {
    mode: "production",
    entry: {
        top: CONFIG.PATH.es6 + "top.es6",
        lower: CONFIG.PATH.es6 + "lower.es6",
    },

    output: {
        filename: "[name].js",
    },

    // ES5(IE11等)向けの指定
    target: ["web", "es5"],

    module: {
        rules: [
            //babel
            {
                test: [/\.js$/, /\.es6$/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    /* {
                                        targets: {
                                            ie: 11,
                                        },
                                        modules: false,
                                        useBuiltIns: "usage",
                                        corejs: 3,
                                    }, */
                                ],
                            ],
                        },
                    },
                ],
                //core-modules,swiper関連などをexcludeします
                exclude: /node_modules\/(?!(core-module|dom7|ssr-window|swiper|array-shuffle)\/).*/,
            },

            //CSS in JS
            {
                test: /\.s?css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: false, sourceMap: false },
                    },
                    "sass-loader",
                ],
            },
        ],
    },

    resolve: {
        extensions: [".es6", ".js"],
        modules: [path.resolve(__dirname, "./node_modules"), "node_modules"],
    },

    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "maps/[name].js.map",
            exclude: ["vendor.js"],
        }),
    ],

    optimization: {
        minimize: true,
        splitChunks: {
            name: "vendor",
            chunks: "initial",
        },
    },

    performance: {
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000,
    },
};
