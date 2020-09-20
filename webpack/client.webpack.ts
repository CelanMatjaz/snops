import webpack from 'webpack';
import * as path from 'path';
import merge from 'webpack-merge';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import commonConfig, { buildDir, clientDir } from './common.webpack';

const isProd = process.env.NODE_ENV === 'production';

const entry = path.join(clientDir, 'index.tsx');
const template = path.join(clientDir, 'template.html');
const outputDir = path.join(buildDir, isProd ? 'dist' : 'debug', 'public');

export default (): webpack.Configuration =>
  merge(commonConfig(), {
    target: 'web',
    entry: [entry],
    output: {
      path: outputDir,
      filename: 'bundle.js',
      publicPath: '/public',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template,
        minify: isProd,
      }),
    ],
  });
