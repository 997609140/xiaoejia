var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()

router.get('/api/list', (req, res) => {
  console.log(req.query)
  var start = req.query.start
  console.log(start)
  if (start === 'homepage') {
    conn.query('SELECT * from homepage limit 0, 4', function (error, results, fields) {
      if (error) {
        throw error
      }
      // console.log(results)
      res.json(results)
    })
  }
  if (start === 'school') {
    conn.query('SELECT * from school limit 0, 10', function (error, results, fields) {
      if (error) {
        throw error
      }
      // console.log(results)
      res.json(results)
    })
  }
  if (start === 'proclamation') {
    conn.query('SELECT * from campusinformation limit 0, 10', function (error, results, fields) {
      if (error) {
        throw error
      }
      // console.log(results)
      res.json(results)
    })
  }
})
module.exports = router
