const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const pages = fs
  .readdirSync(path.resolve(__dirname, 'src'))
  .filter((fileName) => fileName.endsWith('.pug'));

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: '[name]-[contentHash].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contentHash].css',
    }),
    new CleanWebpackPlugin(),
    ...pages.map((page) => new HtmlWebpackPlugin({
      template: `./src/${page}`,
      filename: `${page.split('.')[0]}.html`,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    })),
    new HtmlWebpackInlineSVGPlugin(),
  ],

  module: {
    rules: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'assets/img',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: './fonts/[name]-[hash].[ext]',
          },
        },
      },
      {
        test: /\.mp4$/,
        use: [{
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/video/[name]-[hash].[ext]',
          },
        }, ],
      },
    ],
  },
});