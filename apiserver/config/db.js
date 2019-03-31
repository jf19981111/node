const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParse : true})
    .then(() => { console.log('ok') })
    .catch(() => { console.log('error') })

module.exports = mongoose;