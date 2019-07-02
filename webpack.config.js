var path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'app'),
  },
  mode: "development",
  module: {
    rules: [
      {  // Compile JavaScript files into a single bundle
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
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
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    watchContentBase: true,
    port: 3000
  }
}
