var path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'app'),
  },
  mode: "development",
  resolve: {
    alias: {  // Allows absolute paths in import statements, so we can `import Example from '@store/Example'` instead of `import Example from '../../src/store/Example'` 
      '@util': path.resolve(__dirname, 'src/util/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@config': path.resolve(__dirname, 'src/config/'),
      '@demo-data': path.resolve(__dirname, 'src/demo-data/'),
    },
  },
  module: {
    rules: [
      {  // Compile JavaScript files into a single bundle
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {  // Compile Sass assets
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {  // Copy HTML file
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          },
        ],
      },
      {  // Copy media assets
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
      {  // Copy demo data
        test: /demo-data\/.+\.txt/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'demo-data',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    allowedHosts: [
      'localhost',
      '.zooniverse.org'
    ],
    contentBase: path.join(__dirname, 'app'),
    host: process.env.HOST || 'localhost',
    watchContentBase: true,
    port: 3000
  },
}
