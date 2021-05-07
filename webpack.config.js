const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output:{
    filename: "bundle.js",
    path:path.resolve(__dirname, "./dist"),
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8000,
    hot: true,
    // 代理转发
    // proxy: {
    //   '/react/api': 'http://www.dell-lee.com',
    // },
    proxy: {
      target: 'http://www.dell-lee.com',
      // 如果target是https时，secure需配置为false
      secure: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [['@babel/preset-env', {
                useBuiltIns: 'entry',
                corejs: '3',
                modules: false,
                loose: true,
                targets: {
                  chrome: '67',
                }
              }]],
              "plugins": [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "absoluteRuntime": false,
                    "corejs": 3,
                    "helpers": true,
                    "regenerator": true,
                    "version": "7.0.0-beta.0",
                    proposals: true,
                  }
                ]
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              // 自动修复
              fix: true,
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
