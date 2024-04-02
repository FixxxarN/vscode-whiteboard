'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
  target: 'node',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'extension.js'), to: path.resolve(__dirname, 'dist') },
        { from: path.resolve(__dirname, 'src', 'styles.css'), to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
};

module.exports = config;