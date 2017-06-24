var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      { // this rule will only be used for any vendors
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: [/node_modules/]
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader'],
        exclude: [/node_modules/] // add this line so we ignore css coming from node_modules
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
/*      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'css-loader'
      }, */
/*      {
        test: /\.json$/,
        exclude: helpers.root('node_modules'),
        loader: 'file?name=config/[name].[hash].[ext]'
      }  */
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'app', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
