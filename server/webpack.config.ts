import path from 'path';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import Dotenv from 'dotenv-webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { Configuration } from 'webpack';

const serverConfig = merge<Configuration>({
  mode: 'development',
  target: 'node',
  entry: './index.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve('./'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '/'),
      },
    ],
  },
  plugins: [new Dotenv(), new HardSourceWebpackPlugin()],
  externals: [nodeExternals()],
});

export default serverConfig;
