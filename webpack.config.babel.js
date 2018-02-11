import path from 'path';
import webpack from 'webpack';

export default () => ({
  entry: {
    app: ['./src/client'],
    vendor: ['babel-polyfill', 'jquery', 'jquery-ujs', 'popper.js', 'bootstrap'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'assets'),
    publicPath: '/assets/',
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src/client'),
        query: { presets: ['es2015', 'react', 'stage-0'] }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
           loader: 'postcss-loader',
           options: {
             plugins: () => [
               require('precss'),
               require('autoprefixer')()
             ],
           },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // This name 'vendor' ties into the entry definition
      name: 'vendor',
      // We don't want the default vendor.js name
      filename: 'vendor.js',
      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,
    })//,
    //new webpack.optimize.UglifyJsPlugin(),
  ],
});
