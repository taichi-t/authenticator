import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { Configuration } from 'webpack';

const clientConfig = merge<Configuration>({
  mode: 'development',
  target: 'web',
  entry: './index.tsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
  ],
  devtool: 'inline-source-map',
});

export default clientConfig;
