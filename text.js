
const bcrypt = require('bcryptjs');

//获取一段随机的盐值
//第一个参数 @param{Number}  rounds 盐值的等级强度
/* bcrypt.genSalt(10,(err,salt) => {
    if(err) {
        console.log(err);
    } else {
        console.log('生成的随机盐值是',salt);
        //生成的随机盐值是 $2a$10$059Wq/bFlC8br57SZts4X.
    }
}) */

/* bcrypt.genSalt(10)
    .then(salt => { 
        console.log('生成的随机盐值是',salt) 
        bcrypt.hash('123456',salt, (err,data) => {
            console.log('最终得到的加盐之后的密码是',salt)
        })
    })
    .catch(error => {
        console.log(err) 
    }) */

   /*  bcrypt.hash('123456',10)
        .then(data => {
            console.log('最终得到的加盐之后的密码是',data)
        }) */
//验证密码是否匹配

bcrypt.compare('123456','$2a$10$BQuTfgcYwXGZaJjgK5bdcOq9BWRq1AVydswhKdqHDRkKGcUD8cGu.')
        .then(isOk => {
            console.log(isOk)
        })



/* 
const crypto = require('crypto');

const password = '123456'

//update 第一个参数 是指定要加密的字符串，第二个参数是设置编码格式
//digest 能够输出加密的字符串
let hashPassword = crypto.createHash('sha256').update(password, 'utf8').digest('base64')

console.log(hashPassword)

//加盐

//123456 => jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=

//123456 => Math.random() + jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=

//123456 => Math.random() + jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI= + Math.random()



 */