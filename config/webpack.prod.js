var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
// const API_URL = process.env.API_URL = 'http://localhost:3002';
const METADATA = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  // API_URL: API_URL,
  port: 80,
  ENV: ENV
});

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/apt-maintenance-account/dist/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
/*
  htmlLoader: {
    minimize: false // workaround for ng2
  },
*/
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options:{
        htmlLoader: { minimize: false }
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
