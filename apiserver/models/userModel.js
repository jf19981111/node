const db = require('../config/db');

const schema = new db.Schema({
    username : String,
    password : String,
    nickName : String
},{
    collection : 'project'
})

module.exports = db.model('a',schema);