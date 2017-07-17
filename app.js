var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();
var consolidate = require('consolidate');
var bodyParser = require('body-parser');
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
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave:true,
    saveUninitialized:false,
    cookie:{
        secure: false,
        maxAge:1000*60*30 //过期时间设置(单位毫秒)
    }
}));
app.use('/static', express.static(path.join(__dirname, 'public')));//和上面是一样的
app.use('/', index);

var reload = require('reload');
var http = require('http');

var server = http.createServer(app);
reload(server, app);

server.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!');
});
