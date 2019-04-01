const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();

const userRouter = require('./routes/userRouter');

//设置对 req.body 的使用
//默认只对 json 格式 或者 普通表单格式 的数据做解析 Form Data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//设置静态资源托管文件夹
app.use(express.static(path.resolve(__dirname,'./public')))

// 允许 所有的请求跨越
app.use((req,res,next) => {
    res.set('Access-Control-Allow-Origin',"*")
    res.set('Access-Control-Allow-Headers',"content-type,X-Access-Token")
    next();
})

//验证 token 
//=============  注意不能再这里使用 中间件 因为 所有的路由都会在这里经过处理 而登录不需要处理  ============
/* app.use((req,res,next) => {
    // 0. 获取前端在请求头中传递过来的 X-Access-Token
    let token = req.get('X-Access-Token')
    // 1. 是否存在
    if (!token) {//不存在,那么直接返回没有数据
        res.status(401).send({code: -1,msg : 'token不存在'})
    } else {//存在
        // 2. 验证 token 的有效性
        jwt.verify(token,'keyt',(err,payload) => {
            // 判断 验证是否 成功
            if (err) {
                //验证失败
                res.status(403).send({code: -1,msg : '没有权限'})
            } else {
                //验证成功
                //我们可以像别的中间件一样，在req 身上加上一个属性
                //取出 payload 中的 userId
                req.userInfo = payload;
                next();
            }
        })
    }
}) */



app.use('/api',userRouter);

app.listen(3000);