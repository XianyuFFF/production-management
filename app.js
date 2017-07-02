var express = require('express');
var app = express();
var consolidate = require('consolidate');
var index = require('./server/routes/index');
// 
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

  // public path should be the same with webpack config
  publicPath: webpackDevConfig.output.publicPath,
  noInfo: true,
  stats: {
      colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));
// 设置模板文件目录
app.engine('html', consolidate.ejs);
app.set('views', './client/dist');
app.set('view engine', 'html');

app.use('/', index);

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });

var reload = require('reload');
var http = require('http');

var server = http.createServer(app);
reload(server, app);

server.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!');
});


// app.use('/', require('connect-history-api-fallback')());
// app.use('/', express.static('client/dist'));

// if (process.env.NODE_ENV !== 'production') {
//   var webpack = require('webpack');
//   var webpackConfig = require('./webpack.config.js');
//   var webpackCompiled = webpack(webpackConfig);
//   // 配置运行时打包
//   var webpackDevMiddleware = require('webpack-dev-middleware');
//   app.use(webpackDevMiddleware(webpackCompiled, {
//     publicPath: "/",
//     stats: {colors: true},
//     lazy: false,
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: true
//     },
//   }));

//   // 配置热更新
//   var webpackHotMiddleware = require('webpack-hot-middleware');
//   app.use(webpackHotMiddleware(webpackCompiled));
// }

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s gin', host, port);
// });