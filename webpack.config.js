const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const joinRoot = path.join.bind(path, __dirname);

module.exports = {
  mode: 'production',
  entry: joinRoot('src/index.ts'),
  resolve: {
    extensions: ['.js', '.ts', '.css'],
  },
  output: {
    path: joinRoot('dist/'),
    filename: 'mlia.user.js',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [ 'ts-loader' ],
      include: [
        joinRoot('src'),
      ],
    }],
  },
  optimization: {
    // preserve userscript banner
    minimize: false,
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.BannerPlugin({
      raw: true,
      banner:
`// ==UserScript==
// @name         MLIA
// @namespace    https://github.com/idiotWu
// @version      ${pkg.version}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @match        *://w5.linguaporta.jp/user/seibido/
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==
`
    }),
  ],
}
