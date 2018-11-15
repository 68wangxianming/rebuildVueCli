const merge = require('webpack-merge')
const baseCinfig = require('./webpack.base')
const webpack = require('webpack')

const config = merge(baseCinfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ]
  },
  devServer: {
      host: '127.0.0.1',
      port: '3000',
      hot: true,
      overlay: {
          errors: true
      },
      historyApiFallback: true,
      publicPath: '/',
      clientLogLevel: 'none',
      compress: true,
      // quiet: true,
      before(app) {
          app.get('/apis/test.json', function (req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
              res.json({code: 200, message: 'hello world'})
          })
      }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = config
