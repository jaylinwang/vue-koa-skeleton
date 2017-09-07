const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '../client/', dir)
}

module.exports = {
  entry: {
    home: resolve('pages/home/index.js'),
    400: resolve('pages/400/index.js'),
    500: resolve('pages/500/index.js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader']
      })
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }]
  },
  plugins: [
    new HtmlPlugin({
      title: '400',
      filename: '../../view/400.html',
      template: resolve('/template/default.html'),
      alwaysWriteToDisk: true,
      chunks: ['400']
    }),
    new HtmlPlugin({
      title: '500',
      filename: '../../view/500.html',
      template: resolve('/template/default.html'),
      alwaysWriteToDisk: true,
      chunks: ['500']
    }),
    new HtmlPlugin({
      title: '首页',
      filename: '../../view/home.html',
      template: resolve('/template/default.html'),
      alwaysWriteToDisk: true,
      chunks: ['home']
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
}
