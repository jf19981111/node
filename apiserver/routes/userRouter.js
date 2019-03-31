const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        let username = req.query.username;
        let password = req.query.password;

        //去数据库中查询
        UserModel.findOne({
            username : username
        }).then(data => {
            if(!data) {
               res.send({
                   code : -1,
                   msg : '用户名不存在'
               }) 
            } else {
                //前端的密码与数据库中的密码做比较
                bcrypt.compare(password,data.password,function(err,isOk){
                    if (err) {
                        res.send({
                            code : -2,
                            msg : '密码错误'
                        })
                    } else {
                        if (isOk) {
                            // 签发一个 token 并且返回给前端
                            let token = jwt.sign({
                                username : data.username
                            },'keyt');


                            res.send({
                                code : 0,
                                msg : '登录成功',
                                token : token
                            })
                        } else {
                            res.send({
                                code : -2,
                                msg : '密码错误'
                            })
                        }
                    }
                })
            }
        })
    })

module.exports = router;