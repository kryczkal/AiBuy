import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: Configuration = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: ['/node_modules/'],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.module\.scss$/i,
        exclude: ['/node_modules/'],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/i,
        exclude: ['/node_modules/', /\.module\.scss$/i],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Boilerplate',
      template: path.join(__dirname, '../public/index.html'), // output file
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]__[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
};

export default config;
