const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnext = require('postcss-cssnext');
const precss = require('precss');
const scss = require('postcss-scss');
const atImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    enforceExtension: false,
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      vue: 'vue/dist/vue.common.js',
    },
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    // publicPath: '/',
    filename: 'build.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader',
            }),
            less: ExtractTextPlugin.extract({
              use: ['css-loader', 'less-loader'],
              fallback: 'vue-style-loader',
            }),
            scss: ExtractTextPlugin.extract({
              use: ['css-loader', 'sass-loader'],
              fallback: 'vue-style-loader',
            }),
          },
          postcss: {
            plugins: [
              atImport(),
              precss(),
              cssnext({
                browsers: ['last 2 versions'],
              }),
            ],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|eot|ttf|woff2|woff?)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      title: 'config.title',
      template: path.resolve(__dirname, 'src/index.html'),
      filename: '../docs/index.html',
    }),
  ],
};
