/*
 * ========== 配置说明 ==========   
 * entry 开始打包的入口文件
 * output bundle文件的输出配置
 * module 加载各类loader
 * proxy 代理
 * devtool sourceMap配置
 * alias 别名
 * externals 通过script的方式引入文件
 * plugins 配置各类插件
 */


var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 获取当前分支版本号，分支格式为`daily/x.y.z`
var execSync = require('child_process').execSync
var gitBranch = execSync(`git symbolic-ref --short HEAD`).toString().trim()
var gitVersion = gitBranch.split('/')[1] || ''

var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
  entry: {
    main: path.resolve(APP_PATH, 'boot'),
    vendor: [
      'magix', 
      'homemodel'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: BUILD_PATH,
    // publicPath: !DEV ? gitVersion : '/build/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'jshint-loader'
    }, {
      test: /\.(?:mx|js)$/,
      include: [
        path.resolve(__dirname, 'app/views')
      ],
      loader: 'magix-loader'
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: process.env.NODE_ENV === 'production'
            }
          },
          'less-loader'
        ]
      })
    }]
  },
  devServer: {
    proxy: {
      '/review/*': {
        target: 'http://rap.alibaba-inc.com/mockjsdata/795',
        secure: false
      },
      '/semAccount/*': {
        target: 'http://rap.alibaba-inc.com/mockjsdata/795',
        secure: false
      }
    }
  },
  devtool: '#inline-source-map',
  resolve: {
    alias: {
      'homemodel': path.resolve(__dirname, 'app/models/home/index')
    }
  },
  externals: {
    pat: 'Pat',
    $: 'jQuery',
    jquery: 'jQuery',
    'window.jQuery': 'jQuery',
    underscore: '_'
  },
  plugins: [
    new DashboardPlugin(),
    new ExtractTextPlugin({
      filename: 'index.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: 4
    })
  ]
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
        drop_console: true
      }
    }),
    new CleanWebpackPlugin(['build'])
  ])
}
