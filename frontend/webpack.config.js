var path = require("path")
var webpack = require('webpack')
const paths = require('./config/paths');
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
context: __dirname,
 entry: './src/index',
// entry: [
//   // We ship a few polyfills by default:
//   //require.resolve('./polyfills'),
//   // Include an alternative client for WebpackDevServer. A client's job is to
//   // connect to WebpackDevServer by a socket and get notified about changes.
//   // When you save a file, the client will either apply hot updates (in case
//   // of CSS changes), or refresh the page (in case of JS changes). When you
//   // make a syntax error, this client will display a syntax error overlay.
//   // Note: instead of the default WebpackDevServer client, we use a custom one
//   // to bring better experience for Create React App users. You can replace
//   // the line below with these two lines if you prefer the stock client:
//   //require.resolve('react-dev-utils/webpackHotDevClient'),
//   require.resolve('webpack-dev-server/client') + '?http://localhost:3000',
//   require.resolve('webpack/hot/dev-server'),
//
//   // Finally, this is your app's code:
//   paths.appIndexJs,
//   // We include the app code last so that if there is a runtime error during
//   // initialization, it doesn't blow up the WebpackDevServer client, and
//   // changing JS code would still trigger a refresh.
// ],

output: {
    path: path.resolve('./assets/bundles/'),
    filename: "[name]-[hash].js",
},

plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
],

module: {
    loaders: [
    { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }

    ],
},

}
