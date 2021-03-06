var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = function(env) {
  
  var IS_PRODUCTION = (function() {
    if ( env != "production" ) {
      env = "development";
    }
    // env: $ ./node_modules/.bin/webpack --env production => production
    console.log( "webpack --env:", env );
    return env == "production";
  })();
  
  // var BUNDLE_FILE_NAME = "bundle-" + (IS_PRODUCTION ? "prod" : "dev");
  
  // 本番環境かどうか
  var definePlugin = new webpack.DefinePlugin({
    IS_PRODUCTION: IS_PRODUCTION,
  });
  
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
              'autoprefixer-loader?browsers=last 2 versions',
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
      new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
      definePlugin
    ]
  }
};