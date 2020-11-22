import path from 'path';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import Dotenv from 'dotenv-webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { Configuration } from 'webpack';
import commonConfig from './webpack.common.config';

const serverConfig = merge<Configuration>(commonConfig, {
  mode: 'development',
  target: 'node',
  entry: './src/server/index.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.server.json',
            },
          },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/server/'),
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new Dotenv(), new HardSourceWebpackPlugin()],
  externals: [nodeExternals()],
});

export default serverConfig;
