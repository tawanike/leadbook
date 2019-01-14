const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: ['./frontend/browser/index'],
  mode: 'development',
  watch: true,
  output: {
      path: path.resolve('./static'),
      filename: "js/[name]-[hash].js"
  },
  devServer: {
    contentBase: path.join(__dirname, './templates'),
    compress: true,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: 'http://localhost:3000/static/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "media/images/[name].[ext]",
          publicPath: url => url.replace(/dist/, "")
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1}
            },
            {
              loader: "postcss-loader",
              options: { plugin: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name]-[hash].css'),
    new BundleTracker({filename: './webpack-stats.json'}),
    new CleanWebpackPlugin(['./static']),
  ]
}
