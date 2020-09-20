import webpack from 'webpack';
import * as path from 'path';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import commonConfig, { buildDir, serverDir } from './common.webpack';

const isProd = process.env.NODE_ENV === 'production';

const entry = path.join(serverDir, 'index.ts');
const outputDir = path.join(buildDir, isProd ? 'dist' : 'debug');

export default (): webpack.Configuration =>
  merge(commonConfig(), {
    target: 'node',
    entry,
    output: {
      path: outputDir,
      filename: 'server.js',
      publicPath: '/',
    },
    externals: [nodeExternals(), 'commonjs'],
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      }),
    ],
  });
