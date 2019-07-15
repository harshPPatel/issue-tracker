module.exports = {
  entry: {
    'vendors-ie': './src/vendor-ie.js',
    vendors: './src/vendor.js',
    main: './src/index.js',
  },
  devtool: 'source-maps',
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href', 'source:src'],
        },
      }, ],
    }, ],
  },
};