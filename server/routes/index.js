var express = require('express');
var router = express.Router();
// connect mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs'
})
connection.connect();
// test connect route
router.get('/connect', function(req, res) {
  connection.query('select * from user', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  })
})
router.get('/insert', function(req, res) {
  connection.query('update user set name="MrSosann" where id=100000', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  })
})

router.post('/user/*', function(req, res, next) {
  console.log('this is post login filter')
  // res.send('index1');
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  // res.redirect('/index');
  res.render('index');  
});
router.get('/index', function(req, res) {
  res.render('index');
});
router.get('/login', function(req, res) {
  res.render('index');
});

router.post('/login', function(req, res) {
  var data = req.body;
  console.log(data);
  let result = { id: '100000',
                password: '123456',
                role: 'ProductAdmin',
                name: 'MrSosann',
                remember: true }
  if (data.id == result.id && data.password == result.password) {
    var user = {id: data.id}
    req.session.user = user;
    res.send({result: {
      status: 'success',
      name: result.name
    }});
  } else {
    res.send({result: {
      status: 'fail'
    }});
  }
});
router.get('/register', function(req, res) {
  res.render('index');
});
router.post('/register', function(req, res) {
  console.log(req.body);
  res.send({result: {
    status: 'fail'
  }});
});

// role user page
router.get('/productadmin/:id', function(req, res) {
  res.render('index');
});

router.get('*', function(req, res, next) {
  console.log('this is get login filter')
  // res.send('index1');
  next();
});

router.get('/test', function(req, res, next) {
  console.log('this is test index 1')
  // res.send('index1');
  next();
});
router.get('/test', function(req, res) {
  console.log('this is test index 2')
  res.send('index2');
  res.end();
});
// 定义 sale 页面的路由
router.get('/sale/:id', function(req, res) {
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