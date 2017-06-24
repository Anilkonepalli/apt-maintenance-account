var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

// const API_URL = process.env.API_URL = 'http://localhost:3002';
const METADATA = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  // API_URL: API_URL,
  port: 8080,
  ENV: ENV
});


module.exports = webpackMerge(commonConfig, {

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'API_URL': JSON.stringify(METADATA.API_URL),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'API_URL': JSON.stringify(METADATA.API_URL)
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
