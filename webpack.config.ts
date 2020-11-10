import webpack from 'webpack';
import path from 'path';

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'public'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: 'web',
  devServer: {
    contentBase: './public',
    hot: true,
  },
};

export default config;
