# 基于 express 实现后台管理系统，用来管理班级学生的信息

# webserver 版本 

>使用ejs模板来渲染页面数据 （前后端不分离的项目）

# apiserver 版本

> 这个项目只提供后台接口 不提供页面的渲染 数据之间的交换使用ajax （前后端分离的项目）

当前文件夹注处理后台代码

# 了解 restfulapi 这个文章 

> 这个是根据不同的请求方式 来实现不同的功能 是同一个路由

# 解决跨域的方式请求问题
- 方式一：
$.ajax({
    type:"post",
    url:"http://localhost:3000/api/user",
    // !!! 这里是因为 对设置 req.body 的两个设置时 只对  json 格式的数据 和 普通表单 Form Data 格式的数据 做解析
    // 所以 需要将这里的信息转成 json 格式的字符串
    data : JSON.stringify({
        username : $("[name=username]").val(),
        password : $("[name=password]").val()
    }),
    //dataType : json,
    headers : {
        'Content-Type' : 'application/json; chartset=utf-8'
    },
    success : function(res){
        console.log(res)
    }
});

方式二 ：
axios.post('http://localhost:3000/api/user',{
    username : $("[name=username]").val(),
    password : $("[name=password]").val()
}).then(function(res){
    //console.log(res)
    if(res.data.code == 0) {
        alert('注册成功')
    } else {
        alert('注册失败')
    }
})