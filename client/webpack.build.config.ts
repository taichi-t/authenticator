import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import common from './webpack.common.config';

const isProduction = process.env.DEPLOY_ENV === 'production';

const clientConfig = merge<Configuration>(common, {
  mode: isProduction ? 'production' : 'development',
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devtool: isProduction ? false : 'inline-source-map',
});

export default clientConfig;
