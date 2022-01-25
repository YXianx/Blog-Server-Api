const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const port = 5000

const serverHandler = require('../app')
const handleRoute = require('../src/routers/router')

// 设置跨域以及服务器配置
app.all('*',serverHandler)

// 安装body-parser中间件读取POST数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 安装session
app.use(session({
    secret:"keyboard cat",  // 对session id相关的cookie进行签名
    resave:false,  
    saveUninitialized:true,  // 是否保存初始化的绘画
    cookie:('name','value',{maxAge:5*60*1000,secure:false})  // 设置session的有效时间，单位毫秒
}))

// 路由接口
handleRoute(app)

// 开启端口
app.listen(port,()=>{
    console.log('express-blog-service is start port:5000');
})
