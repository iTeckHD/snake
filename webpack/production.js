const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const defaultConfig = require('./default.js');

// Directories
const CLIENT_DIR = path.resolve(__dirname, '../src');

module.exports = merge(defaultConfig, {
  mode: 'production',
  entry: {
    app: path.join(CLIENT_DIR, 'app.tsx')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['build'], {
      root: path.join(__dirname, '../'),
      verbose: true,
      dry: false,
      exclude: []
    }),
    new HtmlWebpackPlugin({
      title: 'HTML 5 - Snake',
      template: './src/index.html'
    })
  ]
});
