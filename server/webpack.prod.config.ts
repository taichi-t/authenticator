import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import common from './webpack.common.config';

const serverConfig = merge<Configuration>(common, {
  mode: 'production',
});

export default serverConfig;
