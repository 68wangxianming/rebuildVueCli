const path = require('path')
const merge = require('webpack-merge')
const baseCinfig = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = merge(baseCinfig, {
    output: {
        filename: 'js/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].[hash:7].css'),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /node_modules/, //这里虽然分离了,但是没有做到按需引入,看官方配置也不是很明白
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: true
    }
})

module.exports = config
