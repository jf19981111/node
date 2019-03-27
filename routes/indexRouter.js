//专门处理用来渲染ejs模板页面的路由文件
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    //判断用户是否登录
    // req.cookies 是一个对象
    if(req.cookies.nickName) {
        res.render('index',{
            nickName : req.cookies.nickName
        });

    }else {
        res.redirect('/login.html');
    }
    
})

router.get('/login.html', (req,res) => {
    res.render('login')
})

router.get('/register.html', (req,res) => {
    res.render('register')
})

module.exports = router;