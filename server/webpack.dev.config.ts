import merge from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import { Configuration } from 'webpack';
import common from './webpack.common.config';

const serverConfig = merge<Configuration>(common, {
  mode: 'development',
  plugins: [new Dotenv()],
});

export default serverConfig;
