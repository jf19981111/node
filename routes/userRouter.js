//专门处理用户相关的路由
const express = require('express');
const bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel');
const router = express.Router();


//处理注册的路由 http://localhost:3000/user/register
router.post('/register', (req,res) => {
    //1.获取前端传递过来的参数
    let username = req.body.username;
    let password = req.body.password;
    //console.log(username,password)
    let saltPassword = ''; //加盐之后的密码
      //2.对参数做校验
    bcrypt.hash(password,10).then(saltPassword => {
         //3.操作数据库写入数据
        let user = new UserModel({
            username : username,
            password : saltPassword
        })

        // 4. 操作 save 方法
        user.save()
            .then(() => { 
                console.log('注册成功')
                res.redirect('/login.html') 
            })
            .catch(error => {
                console.log('注册失败') 
                res.send('注册失败')
            })
        })
  

   
})

//处理登录的路由 http://localhost:3000/user/login
router.post('/login', (req,res) => {
    //1.获取前端传递过来的参数
    let username = req.body.username;
    let password = req.body.password;

    //2.参数校验

    //3.验证用户名是否存在
    UserModel.findOne({
        username
    }).then(data => {
        if(!data) {//用户名不存在 请注册
            res.send({
                code : -1, 
                msg : '用户名不存在'
            })
        } else {//用户名存在，判断密码是否正确
            console.log(data)
            bcrypt.compare(password,data.password,(err,isOk) => {
                if(isOk) {
                    //跳转首页之前将用户名 username 与 is_admin 写入到 session 中
                    //console.log(req.session)
                    req.session.username = data.username;
                    req.session.isAdmin = data.is_admin;
                    res.redirect('/'); 
                    //  res.send({
                    //     code : 0,
                    //     msg : '登录成功'
                    // }) 
                } else {
                    res.send({
                        code : -2,
                        msg : '密码错误'
                    })
                }
            })
        }
    })
})

//退出登录 http://localhost:3000/user/logout
router.get('/logout',(req,res) => {
    //销毁当前的 session
    req.session.destroy();
    //这里有一个bug 就是退出登录后 点击返回浏览器回退操作还会保存在首页面 这是浏览器的缓存
    //如何解决？ 使用中间件函数 只要访问的地址 是在 indexRouter 这样的地址里面 这些页面的请求不让他做缓存
    ///req.session.username = null;
    res.redirect('/login.html')
})

module.exports = router;