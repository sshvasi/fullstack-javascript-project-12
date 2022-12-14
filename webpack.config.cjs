const path = require('path');
const { ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: false,
    proxy: {
      '/': 'http://0.0.0.0:5001',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chat',
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new ProvidePlugin({
      React: 'react',
    }),
    new Dotenv(),
  ],
};
