var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()

router.post('/', (req, res) => {
  var b = req.body
  console.log(b)
  conn.query('SELECT * from stus WHERE tel = ?', b.tel, function (error, results, fields) {
    if (error) {
      res.json({title: '服务器错误'})
    }
    if (!results.length) {
      console.log(b.tel)
      var sql = 'INSERT INTO stus (`username`,`tel`, `password`, `stuviews`) values (?,?,?,?)'
      var views = b.studentview.join('')
      var data = [b.name, b.tel, b.password, views]
      conn.query(sql, data, function (err, results) {
        if (err) {
          console.log(err)
        } else {
          console.log('ok')
          res.json({title: '注册成功', num: 1})
        }
      })
    } else {
      console.log(results)
      res.json({title: '账号已注册,请登陆！'})
    }
  })
})
module.exports = router
