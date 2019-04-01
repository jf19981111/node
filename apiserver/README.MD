- 单独的抽离 使用 multer 这个模块 上传文件
- 安装 npm instal --save multer
- 是在 req.body 中获取文件信息
# 只要你的请求设置为 表单形式的时候 req.body 不管是文件形式的数据还是其他文本类型的数据 都拿不到 
> 这是因为 设置 body 的这两个中间件没办法解析文件上传的那些相关操作

> 使用 form表单发送的请求 Content-Type 为 'multipart/form-data; boundary=----WebKitFormBoundarysl3MAnS7eTVltEBb'