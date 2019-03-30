const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/project';

mongoose
    .connect(url,{ useNewUrlParser : true })
    .then(() => {
        console.log('连接数据库成功')
    })
    .catch(error => {
        console.log('连接数据库失败',erro.message);
        
    })

module.exports = mongoose;
