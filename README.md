# 基于 express 实现后台管理系统，用来管理班级学生的信息

# webserver 版本 

>使用ejs模板来渲染页面数据 （前后端不分离的项目）

# apiserver 版本

> 这个项目只提供后台接口 不提供页面的渲染 数据之间的交换使用ajax （前后端分离的项目）

# 需求

1. -判断是否登录，如果没有登录，则需要跳转到登录页面

    登录之后给浏览器写一个cookie nickName