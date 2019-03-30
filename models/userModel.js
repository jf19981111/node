// 1. 引入 db
const db = require('../config/db');

// 2. 创建 schema
const schema = new db.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    nickName : {
        type : String,
        default() {
            return '普通用户'
        }
    },
    sex : {
        type : Number,
        default() {
            //0 女
            //1 男
            return 0;
        }
    },
    avator : {
        type : String,
        default() {
            return '/images/avator.png'
        }
    },
    is_admin : {//代表当前用户是否是管理员
        type : Number,
        default() {
            //0 普通用户
            //1 管理员
            return 0;
        }
    }
})

// 3. 基于 schema 创建原型
module.exports = db.model('user',schema);
