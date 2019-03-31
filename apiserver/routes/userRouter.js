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
                                username : data.username,
                                userId : data._id
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

// 更改用户头像信息
// 拿到用户的 id 通过用户的 id 来拿到用户的基本信息 如 昵称 头像等
//直接使用 用户的id 来获取用户的信息 不够安全，因为如果有人知道了这个接口，
//那么在不登录的情况，随意伪造一个 id 来调用这个请求，我后台没有校验，那么这个接口是不安全的
// 那么怎样安全？
//在用户登录成功的时候，将此用户的id，写到 paylod 中，并生成一个 token
//后续 前端要调用这个请求的时候，不需要主动传递 userId 这个字段，只需要将 token 写在
//请求头中，以 X-Access-Token 的请求头携带过来，后台这个地方就验证前端传递过来的 X-Access-Token，
/**
 * 1.验证不通过，就直接响应403的状态码，并告诉前端没有这个权限
 * 2. 验证通过，就能拿到 token 中 payload 的id信息，再使用这个id去获取数据库中相对于的用户信息响应给前端即可。
 * 
 * 
 */
// http://localhost:3000/api/getUserInfo
router.get('/getUserInfo',(req,res) => {
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
                //验证失败
                //取出 payload 中的 userId
                let userId = payload.userId;
                UserModel.findById(userId,{ password : 0 })
                    .then(data => {
                        if(!data) {
                            res.send({
                                code : -1,
                                msg : '用户信息查询失败，不存在此用户'
                            })
                        } else {
                            //成功查询到用户信息
                            res.send({
                                code : 0,
                                msg : '查询成功',
                                userInfo : data
                            })
                        }
                    })
            }
        })
    }
})




module.exports = router;