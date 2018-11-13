const path = require('path')
const merge = require('webpack-merge')
const baseCinfig = require('./webpack.base')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = merge(baseCinfig, {
  output: {
    filename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      },
      {
        test:/\.less$/,
        use:[
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css",
    })
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
