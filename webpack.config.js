
const path              = require('path'),
      webpack           = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      OfflinePlugin     = require('offline-plugin'),

      html              = new HtmlWebpackPlugin({template: 'index.html', title: 'Diply - Connecting Users'}),
      offline           = new OfflinePlugin({
            ServiceWorker: { events: true }
      });



module.exports = {
    cache: true,

    entry: './src/client/js/index.js',

    output: {
        path    : path.resolve(__dirname, './build'),
        filename: './build/[name].[contenthash:4].js'
    },

    plugins: [html],

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

    mode: 'production',

    devtool: 'source-map'
}