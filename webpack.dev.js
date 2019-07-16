const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

const pages = fs
  .readdirSync(path.resolve(__dirname, 'src'))
  .filter((fileName) => fileName.endsWith('.html'));

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  plugins: [
    ...pages.map((page) => new HtmlWebpackPlugin({
      template: `./src/${page}`,
      filename: page,
    })),
  ],

  module: {
    rules: [{
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|gif|jpg|jpeg)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img',
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.mp4$/,
        use: [{
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/video/[name].[ext]',
          },
        }, ],
      },
    ],
  },
});