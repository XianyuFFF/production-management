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
  console.log('this is get login filter: ', req.session.user);
  if (!req.session.user) {
    next();
    // res.redirect('/index');
  } else if (req.session.user) {
    next();
  }
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
  selectParam.push(data.id);
  
  connection.query(selectSQL, selectParam, function (error, results, fields) {
    if (error) throw error;
    if (results[0]) {
      if (results[0].password == data.password) {
        if (results[0].name) {
          // 登录成功
          var user = {
            id: data.id,
            role: data.role,
            name: results[0].name,
          }
          req.session.user = user;
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

// role all user page
router.get('/user/logout',function(req,res) {  
    req.session.user = null;  
    // res.send({
    //   result: {
    //     status: 1,
    //   }
    // })
    res.redirect('/index');
});
// productadmin role 接口
router.get('/user/productadmin/index/:id', function(req, res) {
  res.render('index');
});
router.get('/user/productadmin/currentData', function(req, res) {
  var data = {};
  var storeSQL = 'SELECT * FROM store order by id desc limit 1';
  connection.query(storeSQL, function (error, results, fields) {
    if (error) throw error;
    var result = results[0];
    data.storeData = [{
        key: '1',
        product_a: result.product_a,
        product_b: result.product_b,
        product_c: result.product_c,
        product_d: result.product_d,
      },];
    var orderSQL = 'SELECT SUM(product_a) product_a, SUM(product_b) product_b, SUM(product_c) product_c, SUM(product_d) product_d FROM orders WHERE whether_complete = 0';
    connection.query(orderSQL, function (oerror, oresults, ofields) {
      if (oerror) throw oerror;
      var oresult = oresults[0];
      data.orderData = [{
        key: '1',
        product_a: oresult.product_a,
        product_b: oresult.product_b,
        product_c: oresult.product_c,
        product_d: oresult.product_d,
      },];
      connection.query('SELECT id, name FROM worker', function(werror, wresults, wfields) {
        if (werror) throw werror;
        data.workerData = wresults;
        res.send({data});
      })
    })
  })
});
router.post('/user/productadmin/product', function(req,res) {
  var data = req.body;
  var selectSQL = 'SELECT * FROM store order by id desc limit 1'
  connection.query(selectSQL, function(error, results, fields) {
    if (error) throw error;
    var result = results[0];
    var insertSQL = 'INSERT INTO store (producer_id, sign, change_a, change_b, change_c, change_d, product_a, product_b, product_c, product_d) VALUES (?,?,?,?,?,?,?,?,?,?)'
    var insertParam = [ data.producer_id,
                        1,
                        parseInt(data.product_a),
                        parseInt(data.product_b),
                        parseInt(data.product_c),
                        parseInt(data.product_d),
                        parseInt(data.product_a)+result.product_a,
                        parseInt(data.product_b)+result.product_b,
                        parseInt(data.product_c)+result.product_c,
                        parseInt(data.product_d)+result.product_d,
                      ];
    connection.query(insertSQL, insertParam, function(ierror, iresults, ifields) {
      if (ierror) throw ierror;
      res.send({result: {
        message: `${data.product_a} of A,${data.product_b} of B,${data.product_c} of C,${data.product_d} of D has producted!`
      }});
    })
  })
  console.log(data);
})
router.get('/user/productadmin/workerData', function(req,res) {
  var selectSQL = 'SELECT id, name FROM worker';
  connection.query(selectSQL, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send({data: results})
  })
})
router.post('/user/productadmin/personnel', function(req, res) {
  var data = req.body;
  var selectSQL = `SELECT id, name, gender, tel, email from ${data.role}`;
  connection.query(selectSQL, function(error, results, fields) {
    if(error) throw error;
    console.log(results);
    res.send({
      result: results,
    });
  })
})
router.post('/user/productadmin/adduser', function(req, res) {
  var data = req.body;
  var insertSQL = `INSERT INTO ${data.role} (password) VALUES (123456)`;
  connection.query(insertSQL, function(error, results, fields) {
    if(error) throw error;
    res.send({result:{
      role: data.role,
      id: results.insertId,
    }})
  })
})
// SalesMan 接口
router.get('/user/salesman/index/:id', function(req, res) {
  res.render('index');
});
router.get('/user/salesman/getOrderListData', function(req, res) {
  var data = {};
  var storeSQL = 'SELECT * FROM store order by id desc limit 1';
  connection.query(storeSQL, function (error, results, fields) {
    if (error) throw error;
    var result = results[0];
    data.storeData = {
        product_a: result.product_a,
        product_b: result.product_b,
        product_c: result.product_c,
        product_d: result.product_d,
      };
    var orderSQL = 'SELECT id, salesman_id, order_date, product_a, product_b, product_c, product_d, whether_complete, finish_date FROM orders';
    connection.query(orderSQL, function (oerror, oresults, ofields) {
      if (oerror) throw oerror;
      data.orderData = oresults;
      res.send({data});
    })
  })
})
router.post('/user/salesman/neworder', function(req, res) {
  var data = req.body;
  console.log('this is new order ', data);
  var insertSQL = 'INSERT INTO orders (customer, salesman_id, product_a, product_b, product_c, product_d) VALUES (?,?,?,?,?,?)'
  var insertParam = [ data.customer,
                      200000,
                      parseInt(data.product_a),
                      parseInt(data.product_b),
                      parseInt(data.product_c),
                      parseInt(data.product_d),
                    ];
  connection.query(insertSQL, insertParam, function(error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.send({result: {
      message: `New order ${results.insertId} success!`
    }})
  })
})
router.post('/user/salesman/delivery', function(req, res) {
  var data = req.body;
  console.log('this is delivery data', data);
  var selectSQL = 'SELECT * FROM store order by id desc limit 1'
  connection.query(selectSQL, function(error, results, fields) {
    if (error) throw error;
    var result = results[0];
    var insertSQL = 'INSERT INTO store (sign, change_a, change_b, change_c, change_d, product_a, product_b, product_c, product_d) VALUES (?,?,?,?,?,?,?,?,?)'
    var insertParam = [ 0,
                        parseInt(data.product_a),
                        parseInt(data.product_b),
                        parseInt(data.product_c),
                        parseInt(data.product_d),
                        result.product_a-parseInt(data.product_a),
                        result.product_b-parseInt(data.product_b),
                        result.product_c-parseInt(data.product_c),
                        result.product_d-parseInt(data.product_d),
                      ];
    connection.query(insertSQL, insertParam, function(ierror, iresults, ifields) {
      if (ierror) throw ierror;
      var finish_date = parseInt(Date.now() / 1000);
      var ids = data.selectedRowKeys.join(',');
      var updateSQL = `update orders set whether_complete=1, finish_date=${finish_date} where id in (${ids})`;
      console.log(updateSQL);
      connection.query(updateSQL, function(uerror, uresults, ufields) {
        res.send({result: {
          message: `Delivery successfully!`,
        }})
        console.log(uresults);
      })
    })
  })
})
router.get('/user/warehouseman/index/:id', function(req, res) {
  res.render('index');
});
router.get('/user/worker/index/:id', function(req, res) {
  res.render('index');
});

router.use('/static', express.static('/public'));

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