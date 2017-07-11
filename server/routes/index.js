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
  var selectSQL = 'select * from ProductAdmin where id=?';
  var selectParam = [100000];
  connection.query(selectSQL, selectParam, function (error, results, fields) {
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
// 登录过滤
router.get('/user/*', function(req, res, next) {
  console.log('this is get login filter user*')
  console.log("user filter: ", req.session);
  console.log(req.session.user);
  // if (!req.session.user) {
  //   res.redirect('/index');
  // } else if (req.session.user) {
  //   next();
  // }
  next();
});
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
// 登录处理接口
router.post('/login', function(req, res) {
  var data = req.body;
  console.log(data);
  var selectSQL = `select * from ${data.role} where id=?`;
  var selectParam = [];
  // selectParam.push(data.role);
  selectParam.push(data.id);
  
  connection.query(selectSQL, selectParam, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    if (results[0]) {
      if (results[0].password == data.password) {
        if (results[0].name) {
          // 登录成功
          var user = {
            id: data.id,
            role: data.role,
          }
          req.session.user = 'isLogin';
          req.session.status = 'logined';
          req.session.cookie.status = 'logined';
          console.log("login: ",req.session);
          res.send({result: {
            status: 1,
            message: 'Login successfully, ' + results[0].name,
            id: results[0].id,
            name: results[0].name,
            role: data.role,
          }});
        } else {
          // 账号未激活
          res.send({result: {
            status: 2,
            message: 'User is not active, please signin up first!',
          }});
        }
      } else {
        // 账号或密码错误
        res.send({result: {
          status: 0,
          message: 'Wrong Employee Id or Password, please input again!'
        }});
      }
    } else {
      // 账号不存在
      res.send({result: {
        status: 0,
        message: 'Employee Id is undefined, please input again!'
      }});
    }
  })
});
router.get('/register', function(req, res) {
  res.render('index');
});
// 注册处理接口
router.post('/register', function(req, res) {
  var data = req.body;
  console.log(data);
  var selectSQL = `select * from ${data.role} where id=?`;
  var updateSQL = `update ${data.role} set password=?, name=?, gender=?, tel=?, email=?, question1=?, answer1=? where id=?`;
  var selectParam = [];
  var updateParam = [ data.password, data.name, data.gender, 
                      data.tel, data.email, data.question1, 
                      data.answer1, data.id];
  selectParam.push(data.id);
  
  connection.query(selectSQL, selectParam, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    if ( results[0] ) {
      if (results[0].password == data.old) {
        if (results[0].name) {
          // 已注册
          res.send({result: {
            status: 2,
            message: 'User has been active, please Sign in straightly!',
          }});
        } else {
          // 账号未激活 更新信息
          connection.query(updateSQL, updateParam, function (error, results, fields) {
            if (error) throw error;
            res.send({result: {
              status: 1,
              message: 'Activity successfully!'
            }});
          })
        }
      } else {
        // 账号或密码错误
        res.send({result: {
          status: 0,
          message: 'Wrong Employee Id or Password, please input right!'
        }});
      }
    } else {
      // 账号不存在
      res.send({result: {
        status: 0,
        message: 'Employee Id is undefined, please input right!'
      }});
    }
  })
});

// role user page
router.get('/user/logout',function(req,res) {  
    req.session.user = null;  
    res.redirect('/index');
});  
router.get('/user/productadmin/:id', function(req, res) {
  res.render('index');
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