const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '/'),
  entry: './app/app.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
  new HtmlWebpackPlugin({
              template: 'app/index.html'
  })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'app'),
        query: {
          presets: ["react", "env"],
          plugins: ["transform-class-properties"]
        }
      },
    ],
  },
};