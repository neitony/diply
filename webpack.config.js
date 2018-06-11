
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


console.info(path.resolve(__dirname, './build'))


module.exports = {
    cache: true,

    entry: './src/client/js/index.js',

    output: {
        path    : path.resolve(__dirname, './build'),
        filename: './build/[name].[contenthash:4].js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash    : true,
            title   : 'Diply - Connecting users with the content they love.',
            template: 'index.html'
        })
    ],

    module: {
        rules: [
            {
                test  : /\.js$/,
                loader: 'babel-loader',
                query : {
                    presets       : ['es2015'],
                    cacheDirectory: true
                }

            },
            {
                test: /\.scss$/,
                use : ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(woff|woff2)?$/,
                use : {
                    loader : "url-loader",
                    options: {
                        limit   : 50000,
                        mimeType: "application/font-woff",
                        name    : "./font/[name].[ext]"
                    }
                }
            }
        ]


    },

    mode: 'development',

    devtool: 'source-map'
}