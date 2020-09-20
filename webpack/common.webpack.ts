import webpack from 'webpack';
import * as path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const projectDir = path.resolve('./');

export const srcDir = path.join(projectDir, 'src');
export const buildDir = path.join(projectDir, 'build');

export const serverDir = path.join(srcDir, 'server');
export const clientDir = path.join(srcDir, 'client');
export const commonDir = path.join(srcDir, 'common');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

export default (): webpack.Configuration => ({
  mode: isProd ? 'production' : 'development',
  devtool: isDev ? '#cheap-module-source-map' : undefined,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: ['/node_modules'],
        use: [{ loader: 'babel-loader' }, { loader: 'awesome-typescript-loader' }],
      },
      {
        test: /\.(s?css|sass)$/,
        exclude: ['/node_modules'],
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { minify: true } },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
});
