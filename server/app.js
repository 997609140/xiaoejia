// node 后端服务器
// const fs = require('fs')
// const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
// var db = require('./db/db')

// 启动服务
const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(bodyParser.json())

// 登陆api路由
app.use('/api/login', require('./api/userApi'))
// 注册api路由
app.use('/api/register', require('./api/regsterApi'))
// 首页加载资源
app.get('/api/list', require('./api/homepageApi'))
app.get('/api/list1', require('./api/homepage1Api'))
app.get('/api/list2', require('./api/homelist2Api'))

// 监听端口
app.listen(8080)
console.log('success listen at port:3000......')
