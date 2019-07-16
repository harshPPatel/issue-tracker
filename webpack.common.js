const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'vendors-ie': './src/vendor-ie.js',
    vendors: './src/vendor.js',
    main: './src/index.js',
  },
  devtool: 'source-maps',
  plugins: [
    new CopyPlugin([{
      from: './src/favicon',
      to: './'
    }, ]),
  ],
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href', 'source:src'],
            interpolate: true,
          },
        }, ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/json',
          },
        },
      },
      {
        test: /\.(ico|webmanifest)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '.',
          },
        },
      }
    ],
  },
};