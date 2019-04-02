var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()

router.post('/', (req, res) => {
  var b = req.body
  conn.query('SELECT * from stus WHERE tel = ?', b.tel, function (error, results, fields) {
    if (error) {
      throw error
    }
    if (!results.length) {
      res.json({title: '账号不存在请注册'})
      return
    }
    if (b.password !== results[0].password) {
      res.json({title: '密码错误'})
      return
    }
    res.send({
      num: 1,
      title: '登陆成功',
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552457521393&di=db5044eeadb7b2645b5b12408fae19d5&imgtype=0&src=http%3A%2F%2Fpic.gerenjianli.com%2Fxiaohui2046%2Fb1051.jpg'
    })
  })
})
module.exports = router
