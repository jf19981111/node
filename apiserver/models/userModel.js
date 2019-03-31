const db = require('../config/db');

const schema = new db.Schema({
    username : String,
    password : String,
    nickName : String,
    avator : {
        type : String,
        default : function(){
            return '/images/avator.png'
        }
    }
},{
    collection : 'project'
})

module.exports = db.model('a',schema);