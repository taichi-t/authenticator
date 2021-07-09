import merge from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import common from './webpack.common.config';

const isProduction = process.env.DEPLOY_ENV === 'production';
console.log(process.env.DEPLOY_ENV);

const clientConfig = merge<Configuration>(common, {
  mode: isProduction ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new Dotenv({ systemvars: true }),
  ],
  devtool: isProduction ? false : 'inline-source-map',
});

export default clientConfig;
