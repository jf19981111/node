const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');

//设置对 req.body 的使用
//默认只对 json 格式 或者 普通表单格式 的数据做解析 Form Data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// 允许 所有的请求跨越
app.use((req,res,next) => {
    res.set('Access-Control-Allow-Origin',"*")
    res.set('Access-Control-Allow-Headers',"content-type")
    next();
})

app.use('/api',userRouter);

app.listen(3000);