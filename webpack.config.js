var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: __dirname + 'static/bundle.css',
    allChunks: true,
    disable: process.env.NODE_ENV === "development"
});

module.exports = {  
  entry: [
    "./js/app.js", "./scss/main.scss"
  ],
  output: {
    path: __dirname + '/static',
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      { // js, jsx
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    extractSass
  ],
};
