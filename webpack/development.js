const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const defaultConfig = require('./default.js');

// Directories
const CLIENT_DIR = path.resolve(__dirname, '../src');

module.exports = merge(defaultConfig, {
  mode: 'development',
  entry: {
    app: path.join(CLIENT_DIR, 'index.tsx'),
  },
  // Uncomment this line if you run into runtime errors and need to debug.
  // Turning source-maps on will make your builds twice as slow.
  // devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.SERVER_URL': JSON.stringify('http://192.168.18.77:9000'),
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'HTML 5 - Snake',
      template: path.join(CLIENT_DIR, 'index.html'),
    }),
    new WriteFilePlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
});
