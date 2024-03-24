const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
const BundleTracker = require('webpack-bundle-tracker');

// Set distribution path based on your project structure
const DIST_PATH = path.resolve(__dirname, '../static/dist'); // Assuming 'static' is your static assets folder

// Flag for development mode
const IS_DEV_MODE = process.env.NODE_ENV !== 'production';

module.exports = {
  // Extensions to resolve for imports
  resolve: {
    extensions: ['.js', '.css']
  },

  // Optimization configuration
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({ verbose: true }),
    ],
  },

  // Performance hints for development
  performance: {
    hints: 'warning',
  },

  // Entry points for your application
  entry: [
    './src/main.js', 
  ],

  // Output configuration for bundled files
  output: {
    path: DIST_PATH,
    filename: IS_DEV_MODE ? "bundle.js" : 'bundle.[hash].js',
  },

  // Development mode based on NODE_ENV
  mode: process.env.NODE_ENV,

  // Plugins configuration
  plugins: [
    new BundleTracker({
      path: __dirname,
    }),

    new MiniCssExtractPlugin({
      filename: IS_DEV_MODE ? 'style.css' : 'style.[hash].css',
      // Adjust chunkFilename based on your needs
      chunkFilename: IS_DEV_MODE ? '[id].css' : '[id].[hash].css',
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true,
        },
      },
    }),


  ],

  // Module configuration for loaders
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: DIST_PATH
            },
          },
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
};
