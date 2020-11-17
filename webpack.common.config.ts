import path from 'path';
import { Configuration } from 'webpack';

const commonConfig: Configuration = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

export default commonConfig;
