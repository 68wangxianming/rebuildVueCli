const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');//前端小缓存 非常重要
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');//打包完小窗展示"dev": "webpack-dashboard -- node index.js"
const setTitle = require('node-bash-title');
setTitle('🍎🍎🍎🍎🍎 rebuildVueCli');
const loading = {
  html: '加载中......'
}

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
        include: [path.resolve(__dirname, 'src')],
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: './img'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'img/[name].[hash:7].[ext]'
          }
        }
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
      "@apis": path.resolve('src/apis'),
      "@assets": path.resolve("src/assets"),
      "@common": path.resolve('src/common'),
      "@components": path.resolve('src/components'),
      "@language": path.resolve('src/language'),
      "@plugins": path.resolve('src/plugins'),
      "@router": path.resolve('src/router'),
      "@views": path.resolve("src/views"),
    },

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", '.css', 'less'],
  },

  performance: {
    hints: false
  },
  plugins: [
    // new DashboardPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // 配置变量APP版本号
      }
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets/favicon.ico', to: 'favicon.ico',}, // 顾名思义，from 配置来源，to 配置目标路径
    ]),
    new VueLoaderPlugin(),
    new ManifestPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'index.html', // 配置文件模板
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      },
      loading
    }),
    new WebpackBuildNotifierPlugin({
      title: "大爷！包打好了",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    })
  ],
}
