const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();


//引入相应的路由js文件 ,路由的中间件函数
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
// const bannerRouter = require('./routes/bannerRouter');

//设置使用的模板页面的存放路径与使用的何种模板引擎
app.set('views',path.resolve(__dirname,'./views'));
app.set('view engine','ejs');

//设置静态资源托管文件
app.use(express.static(path.resolve(__dirname,'./public')));

//设置能够使用req.body的中间件
app.use(express.json());
app.use(express.urlencoded({extended : false}))


//设置使用 cookie 中间件
app.use(cookieParser());

//设置session 相关的内容
app.use(session({
    resave : false,
    saveUninitialized : false, //项目默认情况下是否需要主动生成一个session 默认为false
    secret : 'keyt ' //设置密钥
}));

//设置二级路由
app.use('/',(req,res,next) => {
    //如何阻止 首页 | login.html | register.html 的缓存
    res.set('Cache-Control','no-cache, no-store, must-revalidate')
    next();
},indexRouter);
app.use('/user',userRouter);

app.listen(3000);