const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');

//设置对 req.body 的使用
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