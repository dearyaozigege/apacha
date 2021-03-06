// 基本思路 : fs http path

// 三个模块部分的导入
const fs = require('fs');
const http = require('http');
const path = require('path');
const mime = require('mime');



//记录网站根目录
let rootPath = path.join(__dirname, 'www');
console.log(rootPath)


let server = http.createServer((request, response) => {
    // Response.end('today is tuesday');
    //拼接输入的地址 生成新地址
    let targetPath = path.join(rootPath, request.url)
    // console.log(targetPath);
    //先判断用户输入的文件是否存在
    console.log(fs.existsSync(targetPath));
    console.log(targetPath);
    if (fs.existsSync(targetPath)) { //如果路径存在，则返回 true，否则返回 false。
        // response.setHeader('content-type','text/html;charset=utf-8')    
        //因为返回的是布尔值 能进来则代表存在
        //再判断此文件是 文件或是文件夹
        // let stats = fs.stat(targetPath);
        fs.stat(targetPath, (err, stats) => {
            if (stats.isFile()) {

                //按照文件格式分别返回对应的解析方式

                fs.readFile(targetPath, (err, data) => {
                    response.setHeader('content-type', mime.getType(targetPath));
                    response.end(data)
                })
            }
            if(stats.isDirectory()){
                
            }
        })
    }
    // response.end('你存在,我深深的脑海里')
    else {
        //不存在 报404
        response.statusCode = 404;
        response.setHeader('content-type', 'text/html;charset=utf-8')
        //false 页面不存在
        response.end(`
            <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>你请求的${request.url}不在服务器上哦,检查一下呗</p>
            </body></html>
        `)

    }
})

//开启服务器监听
server.listen(2000, '192.168.38.27', () => {
    console.log('hello i am back')
});