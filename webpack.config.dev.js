var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-source-map',

  entry: {
    'client': [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'client/entry.js')
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/dist'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
