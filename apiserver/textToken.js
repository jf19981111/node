// 研究一下 jsonwebtoken 的使用
const jwt = require('jsonwebtoken');

const payload = {
    //要保存在 token 中的信息
    nickName : '张三',
    is_adimin : true
}

//定义一个密钥
const secret = 'keyt';

//生成 token
//签发
const token = jwt.sign(payload,secret)
//console.log(token)
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6IuW8oOS4iSIsImlzX2FkaW1pbiI6dHJ1ZSwiaWF0IjoxNTU0MDIxNTc2fQ.O47kcBiveO9tGHQkDoQ1A0hFCcpp4uNHCxm73KFQojg

//解码
jwt.verify(token,secret,function(err,data){
    if (err) {
        console.log('解码失败',err);
    } else {
        console.log('解码成功',data)
    }
})
