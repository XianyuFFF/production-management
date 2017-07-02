var express = require('express');
var router = express.Router();

// 该路由使用的中间件

// 定义网站主页的路由
router.get('/', function(req, res) {
  console.log('this is route index.js  /')
  res.redirect('/index');
});
router.get('/index', function(req, res) {
  res.render('index');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.render('index');
});

module.exports = router;