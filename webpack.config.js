const path                 = require('path');
const webpack              = require('webpack');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');


module.exports = {
    cache: true,

    entry: './src/client/js/index.js',

    output: {
        path    : path.resolve(__dirname, './build'),
        filename: '[name].[contenthash:4].js'
    },

    plugins: [

        new CleanWebpackPlugin(['build/*.*'], {
            root   : __dirname,
            verbose: true,
            dry    : false,
            watch  : true
        }),

        new HtmlWebpackPlugin({
            title   : '',
            template: 'index.html'
        }),

        new MiniCssExtractPlugin({
            "filename"     : "[name].css",
            "chunkFileName": "[id].css"
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
            }
        ]


    },

    mode: 'production',

    devtool: 'source-map'
}