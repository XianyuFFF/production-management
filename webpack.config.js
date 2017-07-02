var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/src/index.js'
  ],
  output: {
    filename: 'js/[name]-bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
    // publicPath: "http://localhost:8080/client/dist/",
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      title: "PM",
      // inject: false,
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"development"'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};