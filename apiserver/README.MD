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

# jwt 方式 进行 用户认证

- 要注意一点 cookie 和 session 进行用户认证 是页面的拦截 就是说 如果没有登录 那么就给你打回到登录页 在后头路由代码进行判断的 （前后端不分离）
- 而 jwt 这种方式是 对于 前后端分离的 html 不与后端打交道 所以不会用 jwt 来做页面的拦截 可以做 但是会有一闪的效果，
- 所以 jwt呢 是后续要跟服务器发请求的 所以我们拦截呢 只能是操作后的拦截 就是你有没有登录之类的你都可以进入这个网站，当我们有跟
后台交互做请求的时候我们就可以 把本地的 token 传入进去 进行校验 判断你是否登录 有没有这个权限

# 更改用户头像的需求
- 首先明白 要更改用户头像 就需要 后台提供接口 去拿到用户的信息 然后渲染在页面上
- 所以要在登录的时候做操作 拿到 token 但是 要明白 获取用户的信息不需要把密码给渲染出来 所以要把密码过滤掉
- 这里也要设置头信息 X-Access-Token 

- 就是 使用 multer 模块 这个中间件
    经过 multer 中间件处理之后 req上有一个 file 属性
    console.log(req.file)
    能够得到文件对象了 将这个文件重写 换个名字写入到静态资源托管文件中
     1. 将文件从 c:\tmp\xxx -> 当前的public\xxx.png
     这里会有一个 bug 就是当同一个用户 在他的浏览器上面选择同一个图片时候，得到的路径是一样的
     只需要给图片 const newFileName = new Date().getTime() + '_' + req.file.originalname;
     加上一个时间戳
     2. 就是使用form 表单的形式无法设置请求头的 所以使用 ajax 来发请求