import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { Configuration } from 'webpack';
import commonConfig from './webpack.common.config';

const clientConfig = merge<Configuration>(commonConfig, {
  mode: 'development',
  target: 'web',
  entry: './src/client/index.tsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.client.json',
            },
          },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/client/'),
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'public/'),
    watchContentBase: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
  performance: {
    maxEntrypointSize: 600000, // 600kb
    maxAssetSize: 600000, // 600kb
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({ template: './src/client/index.html' }),
    new HardSourceWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
});

export default clientConfig;
