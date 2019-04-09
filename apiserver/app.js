const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest:'c/tmp'}) //设置上传文件的临时路径
// 返回的是一个处理 upload 的对象
/**
 * // 都返回的是一个中间件函数
 * // 单个文件
 * upload.single('filed') //处理单个文件
 * // 指定一个字段多个文件
 * upload.array('filed',maxCount) // 处理多个文件 abc -> 多个文件
 * 
 * upload.fileds([
 *      {
 *          name : 'filed' , // 字段名
 *          maxCount : 2 // 控制这个字段名所能上传的文件的个数
 *      },
 *      {
 *          name : 'efg',
 *          maxCount : 3
 *      }
 * ])
 * // 可以指定多个字段，多个文件
 * 
 * 上面这三个函数调用之后 返回的是中间件函数，也就是说带有 req.res，next 参数的那个中间件函数，对 req.body 做了处理,
 * 可以拿到除了上传文件信息的其他文本信息，还增加了 req.file || req.files 都是一个文件信息的对象
 * 
 */
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(path.resolve(__dirname,'./public')));

// 上传多个文件 upload.fileds
// app.post('/upload',upload.fields([
//     {name : 'abc',maxCount : 2},
//     {name : 'efg',maxCount : 2}
// ]),(req,res) => {
//     console.log(req.body)
//     console.log(req.files);
//     /**
//      * {
//         abc:
//         [ { fieldname: 'abc',
//             originalname: 'timg (1).jpg',
//             encoding: '7bit',
//             mimetype: 'image/jpeg',
//             destination: 'c/tmp',
//             filename: 'c48ab95f6b2e5ec579c94396acbf7ca3',
//             path: 'c\\tmp\\c48ab95f6b2e5ec579c94396acbf7ca3',
//             size: 53271 } ],
//         efg:
//         [ { fieldname: 'efg',
//             originalname: 'timg.jpg',
//             encoding: '7bit',
//             mimetype: 'image/jpeg',
//             destination: 'c/tmp',
//             filename: '7a13046ee38f80145d217fc265713749',
//             path: 'c\\tmp\\7a13046ee38f80145d217fc265713749',
//             size: 52852 } ] 
//         }

//      * 
//      * 
//      * 
//      */

//  /*    let filesUrl = []

//     for(var i = 0; i < req.files.length; i++) {
//         let curFile = req.files[i];

//         //需要对当前的文件 做转存 存到 静态资源托管的文件夹中
//         let newFileName = new Date().getTime() + '_' + curFile.originalname;
//         let newFilePath = path.resolve(__dirname,'./public',newFileName)
//         let fileData = fs.readFileSync(curFile.path);
//         fs.writeFileSync(newFilePath,fileData);

//         filesUrl.push(`http://localhost:3000/${ newFileName}`)
//     }

//     res.send({
//         code : 0,
//         msg : '上传文件成功',
//         // imgUrl : 'http://localhost:3000/' + newFileName
//         filesUrl : filesUrl
//     }) */
// })


 // 上传 多个文件 Array 使用
app.post('/upload',upload.array('abc',2),(req,res) => {
    console.log(req.body)
    console.log(req.files);

    let filesUrl = []

    for(var i = 0; i < req.files.length; i++) {
        let curFile = req.files[i];

        //需要对当前的文件 做转存 存到 静态资源托管的文件夹中
        let newFileName = new Date().getTime() + '_' + curFile.originalname;
        let newFilePath = path.resolve(__dirname,'./public',newFileName)
        let fileData = fs.readFileSync(curFile.path);
        fs.writeFileSync(newFilePath,fileData);

        filesUrl.push(`http://localhost:3000/${ newFileName}`)
    }

    res.send({
        code : 0,
        msg : '上传文件成功',
        // imgUrl : 'http://localhost:3000/' + newFileName
        filesUrl : filesUrl
    })
}) 



/* // 上传单个文件
app.post('/upload',upload.single('abc'),(req,res) => {
    console.log(req.body)
    console.log(req.file)
//需要对当前的文件 做转存 存到 静态资源托管的文件夹中
    let newFileName = new Date().getTime() + '_' + req.file.originalname;
    let newFilePath = path.resolve(__dirname,'./public',newFileName)
    let fileData = fs.readFileSync(req.file.path);
    fs.writeFileSync(newFilePath,fileData);

    res.send({
        code : 0,
        msg : '上传文件成功',
        imgUrl : 'http://localhost:3000/' + newFileName
    })
}) */

app.listen(3000);

//要做文件的上传
//用到 multer 模块