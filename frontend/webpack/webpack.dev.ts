import config from './webpack.common';
import { Configuration } from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { merge } from 'webpack-merge';

module.exports = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    allowedHosts: "all",
    port: 3000,
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:8080/',
    },
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
      cwd: process.cwd(),
    }),
  ],
} as Configuration);
