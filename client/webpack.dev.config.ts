import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { Configuration } from 'webpack';
import common from './webpack.common.config';

const clientConfig = merge<Configuration>(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'public/'),
    watchContentBase: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://[::1]:8080',
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive',
        },
      },
    },
  },
  performance: {
    maxEntrypointSize: 600000, // 600kb
    maxAssetSize: 600000, // 600kb
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new HardSourceWebpackPlugin(),
    new Dotenv(),
  ],
  devtool: 'inline-source-map',
});

export default clientConfig;
