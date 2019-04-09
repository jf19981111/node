// 这块前端页面我也 通过 express 来启动服务，好让自己可以配置正向代理
// 这块 不做 api 的功能 只设置一个静态托管文件夹


const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

app.use(express.static(path.resolve(__dirname,'./public')))

// http://localhost:8080/api/abc -> http://localhost:3000/api/abc
// http://localhost:8080/api/upload -> http://localhost:3000/api/upload

// 想要的  http://localhost:8080/api/upload -> http://localhost:3000/upload
app.use('/api',proxy({
    target : 'http://localhost:3000',  // 目标服务器
    pathRewrite : {
        // 路径重写
        '^/api' : ''
    }
}))

app.listen(8080)


// 配置正向代理

// 让某个 url 请求 主动代理到 目标服务器
// form 表单是不会跨域 所以我们采用 ajax 来进行跨域请求

// localhost:3000  目标服务器（真实提供接口的服务器）

// localhost:8080  代理服务器（除了能够静态托管我们的页面之外，还需要设置哪些 url 地址需要主动代理到我们目标服务器上面）


// 问题，使用 ajax 向 http://localhost:3000/upload 主动发送请求，跨域了。

// 这个api 可以看成是 中间这个服务器的路由
// ajax -> http://localhost:8080/api/upload -> http://localhost:3000/upload