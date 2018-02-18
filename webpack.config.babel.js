import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default () => ({
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public', 'assets'),
    compress: true,
    port: 8085,
  },
  entry: {
    app: ['./src/client'],
    vendor: ['babel-polyfill', 'jquery', 'jquery-ujs', 'bootstrap'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src/client'),
        query: {
          plugins: [
            'transform-runtime',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements',
          ],
          presets: [['env'], ['react'], ['stage-0']],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    }),
  ],
});
