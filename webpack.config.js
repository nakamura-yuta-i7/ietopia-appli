var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'www/dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader',
              'sass-loader?outputStyle=expanded&sourceMap'
            ]
          })
        },
        {
          test: /\.png$/,
          use: { loader: 'url-loader', options: { limit: 10000000 } }, // 10mb
        },
        {
          test: /\.jpg$/,
          use: ['file-loader']
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
    ]
  }
};