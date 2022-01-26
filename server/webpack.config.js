'use strict';
const webpack = require('webpack');
const path = require('path');
module.exports = filename => {
  return {
    entry: filename,
    target: 'node',
    output: {
      path: path.resolve('./', 'app/public'),
      filename: 'bundle.js',
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js', // 内部为正则表达式  vue结尾的
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]',
          },
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  };
};
