//专门处理用来渲染ejs模板页面的路由文件
const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();

router.get('/', (req,res) => {
    //console.log('我是否进来了')
    // 判断用户是否登录
    if(req.session.username) {//存在
        
        //访问数据库
        userModel.find()
            .then(data => {
                res.render('index',{
                    username : req.session.username,
                    isAdmin : req.session.isAdmin,
                    userList : data //得到的是数组
                });
            })

    }else {
        res.redirect('/login.html');
    }
    // res.render('index')
    
})

router.get('/login.html', (req,res) => {
    //当我们使用 session 中间件之后，会主动给我们 req 上面绑定一个 session 属性
    /* console.log(req.session);
    req.session.abc = 'zzzzz';
    console.log(req.session);  */
    res.render('login');
})

router.get('/register.html', (req,res) => {
    res.render('register');
})

module.exports = router;