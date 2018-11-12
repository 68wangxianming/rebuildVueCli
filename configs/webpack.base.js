const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
        ],
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src'),
        ],
        alias: {
            vue: 'vue/dist/vue.js',
            pages: path.resolve(__dirname, 'src/pages'), // 这里使用 path.resolve 和 __dirname 来获取绝对路径
            apis: path.resolve(__dirname, 'src/apis'),
            components: path.resolve(__dirname, 'src/components'),
            router: path.resolve(__dirname, 'src/router'),
        },

        extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", '.css', 'less'],
    },

    plugins: [
        new webpack.DefinePlugin({
            CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2') // 配置变量APP版本号
            }
        }),
        new CopyWebpackPlugin([
            {from: 'src/assets/favicon.ico', to: 'favicon.ico',}, // 顾名思义，from 配置来源，to 配置目标路径
        ]),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: 'index.html', // 配置文件模板
        }),
    ],
}
