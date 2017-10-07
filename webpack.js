var path = require('path');
var webpack = require('webpack');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
      query: {
        presets: ['es2015', 'react', 'stage-0', 'stage-1'],
      },
    },{
      test: /\.css$/,
      loader:'style-loader!css-loader'
    }]
  },
};

loaders:[{
  test:'/\.css$/',loader:'style!css!'
}]