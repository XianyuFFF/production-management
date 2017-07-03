var express = require('express');
var router = express.Router();

// 该路由使用的中间件

// 定义网站主页的路由
router.get('/', function(req, res) {
  // res.redirect('/index');
  res.render('index');  
});
router.get('/index', function(req, res) {
  res.render('index');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.render('index');
});

module.exports = router;

// react-router
// /* 根路由 web应用主页 以及各角色登录入口 */
// '/'
// '/index'

// /* 库管员主页 查看库存记录 录入库存信息 */
// '/warehouseman'

// /* 销售人员 */
// '/salesman'

// /* 生产工人 */
// '/worker'

// /* 生产管理员 */
// '/productinAdmin'