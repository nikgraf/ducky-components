const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve('preview', 'main.js')
    ],
    output: {
        publicPath: '/build/',
        filename: 'main.js',
        path: path.resolve('build')
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('components')
      })
    ],
    resolve: {
      alias: {
        examples: path.resolve('examples.js')
      }
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              "presets": ["react", "es2015", "stage-0", "react-hmre"]
            }
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css',
            include: /node_modules/
        }, {
            test: [/\.woff/, /\.eot/, /\.woff2/, /\.ttf/, /\.svg/],
            loader: 'url?limit=20'
        }]
    }
};
