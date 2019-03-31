const express = require('express');
const bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel');
const router = express.Router();

// 注册 http://localhost:8080/api/user/register
// 注册 http://localhost:8080/api/user
//router.post('/user/register')

// 登录 http://localhost:8080/api/user/login
//ttp://localhost:8080/api/user
//router.get('/user/login')

// restfulapi 就是 url 地址都一样 但是根据请求方式的不同 来做不同的操作

// http://loalhost:8080/api/user
router.route('/user')
    .post((req,res) => {// 处理注册
        bcrypt.hash(req.body.password,10)
            .then(saltPassword => {
              let user = new UserModel({
                    username : req.body.username,
                    password : saltPassword
                })
                user.save()
                    .then(() => {
                        res.send({
                            code : 0,
                            msg : '注册成功'
                        })
                    })
                    .catch(error => {
                        res.send({
                            code : -1,
                            msg : '注册失败'
                        })
                    })
            })
    })
    .get((req,res) => { //处理登录

    })

module.exports = router;