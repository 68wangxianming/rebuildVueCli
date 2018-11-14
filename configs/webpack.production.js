const path = require('path')
const merge = require('webpack-merge')
const baseCinfig = require('./webpack.base')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = merge(baseCinfig, {
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true //css压缩
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
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
      chunkFilename: "css/[id].[hash:7].css",
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

module.exports = smp.wrap(config)
