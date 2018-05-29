var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function (err, result) {
    // localStorage.setItem('orders', JSON.stringify([
    //     { id: 'ORD-0917-001', "date" : new Date(), price: 150 },
    //     { id: 'ORD-0917-002', "date" : new Date(), price: 1600 },
    //     { id: 'ORD-0917-003', "date" : new Date(), price: 1165 }
    // ]));
  if (err) {
    console.log(err)
  }

  console.log('Listening at 0.0.0.0:3000')
})
