import webpack from 'webpack';
import path from 'path';
import webpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const mode = process.env.NODE_ENV || 'development';

const config = {
  web: {
    entry: './src/client/index.tsx',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'public'),
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      inline: true,
      open: true,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
        },
      },
    },
  },
  node: {
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    entry: './src/server/index.ts',
    externals: [nodeExternals()],
  },
};

const baseConfig: webpack.Configuration = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  performance: {
    maxEntrypointSize: 600000, // 600kb
    maxAssetSize: 600000, // 600kb
  },
  devtool: mode === 'development' ? 'inline-source-map' : false,
  plugins: [new Dotenv()],
};

const targets = ['web', 'node'].map((target) => {
  const base = webpackMerge(baseConfig, {
    target,
    ...config[target],
    plugins:
      target === 'web'
        ? [
            new Dotenv(),
            new HtmlWebpackPlugin({ template: './src/client/index.html' }),
            new HardSourceWebpackPlugin(),
          ]
        : [new Dotenv(), new HardSourceWebpackPlugin()],
  });
  return base;
});

module.exports = targets;
