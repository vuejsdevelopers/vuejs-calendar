require('dotenv').config();

var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var baseConfig = {
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader' })
      },
      {
        test: /\.(png|jpg|gif|svg|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          publicPath: process.env.CDN_URL && process.env.NODE_ENV === 'production' ? `${process.env.CDN_URL}/dist/` : false
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js',
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  }
};

let targets = [ 'web', 'node' ].map((target) => {
  return webpackMerge(baseConfig, {
    target: target,
    entry: {
      app: target === 'web'
        ? process.env.NODE_ENV === 'development'
        ? [ `./src/${target}.entry.js`, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000' ]
        : [ `./src/${target}.entry.js` ]
        : [ `./src/${target}.entry.js` ]
      ,
    },
    output: {
      filename: `${target}.bundle.js`,
      libraryTarget: target === 'web' ? 'var' : 'commonjs2'
    },
    plugins: target === 'web'
      ? process.env.NODE_ENV === 'development'
      ? [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("style.css")
    ]
      : [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true, compress: { warnings: false } }),
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new ExtractTextPlugin("style.css")
    ]
      : []
    ,
    devtool: target === 'web'
      ? process.env.NODE_ENV === 'development'
      ? '#eval-source-map'
      : '#source-map'
      : false
  });
});

module.exports = targets;
