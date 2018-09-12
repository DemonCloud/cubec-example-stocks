const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const server = require('./server');

module.exports = {
  entry: './app/index.js',
  mode: 'development',
  // mode: 'production',

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'stocks.webpack.min.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    })
  ],

  devServer: {
    compress: true,
    port: 9001,
    before: server,
    https: true,

    proxy: {
      "/api": {
        target: "https://api.iextrading.com",
        secure: false,
        pathRewrite: {'^/api' : ''}
      }
    }
  },

  devtool: 'inline-cheap-source-map',
};
