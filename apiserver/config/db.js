const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser : true})
    .then(() => { console.log('数据库连接成功') })
    .catch(() => { console.log('数据库连接失败') })

module.exports = mongoose;