import webpack from 'webpack';
import path from 'path';
import webpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

const mode = process.env.NODE_ENV || 'development';

const config = {
  web: {
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'public/js'),
    },
    entry: './src/client/index.tsx',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      hot: true,
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
};

const targets = ['web', 'node'].map((target) => {
  const base = webpackMerge(baseConfig, {
    target,
    ...config[target],
  });
  return base;
});

module.exports = targets;
