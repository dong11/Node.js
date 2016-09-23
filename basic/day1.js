/**
 * Created by dong on 16/9/22.
 */
//    简单创建一个Server

// require方法用来引入一个模块，参数是模块的名字
var http = require('http');
var fs = require('fs');
// HTTP模块的createServer()方法，接受一个方法作为参数，原型为：
// http.createServer([requestListener])
// requestListener为回调方法 如: function (request, response) { }
// 第一个参数request的类型是http.IncomingMessage，实现了Readable Stream接口。
// 第二个参数的类型是http.ServerResponse，实现了Writeable Stream接口。

http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Hello World!");

    // request是http.IncomingMessage的实例，
    // 通过这个实例，我们可以拿到请求参数，比如HTTP方法、HTTP版本、url、头部等，
    console.log("method:" + req.method);
    console.log("version:" + req.httpVersion);
    console.log("url:" + req.url);

    //var data = fs.readFileSync('README.md'); //同步读取文件, 读取完 才执行下一步
    //res.end(data);
    //异步读取文件,利用回调接口处理结果
    fs.readFile('README.md', function(err, data){
        if(err) return;
        res.end(data);
    });
}).listen(8081);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8081/');