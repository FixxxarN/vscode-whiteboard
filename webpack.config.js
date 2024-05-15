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
    alias: {
      '~': path.resolve(`${__dirname}/src`)
    },
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ["@babel/preset-react", { "runtime": "automatic" }]],
          },
        },
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'extension.js'), to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
};

module.exports = config;