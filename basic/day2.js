/**
 * Created by dong on 16/9/23.
 */
//创建文件服务器

//引入模块
var http = require('http');
var fs = require('fs');

//*************自定义事件开始*******************
var util = require('util');
var events = require('events');

function Ticker(){
    var self = this;
    events.EventEmitter.call(this);
    setInterval(function(){
        self.emit("tick")
    }, 1000);
}
//Node.js的工具模块封装了继承的方法，我们调用它来的inherits方法来完成Ticker对events.EventEmitter的继承。
util.inherits(Ticker, events.EventEmitter);

var ticker = new Ticker();
ticker.on("tick", function() {
    console.log("tick event");
});
//*************自定义事件结束*******************


//创建server,指定处理客户端请求的函数
http.createServer(function(req, res){
    //判断HTTP方法,只处理GET
    if(req.method != 'GET'){
        res.writeHead(403);
        res.end();
        return null;
    }

    //此处也可使用URL模块来分析URL(https://nodejs.org/api/url.html)
    var sep = req.url.indexOf('?');
    var filePath = sep < 0? req.url : req.url.slice(0,sep);

    var fileStat = fs.stat("." + filePath, function(err, stats){
        if(err){
            res.writeHead(404);
            res.end();
            return null;
        }
        //TODO:Content-Type应该根据文件类型设置
        res.writeHead(200, {"Content-Type": "text/plain", "Content-Length": stats.size});

        //使用Stream
        var stream = fs.createReadStream("."+filePath);

        stream.on('data',function(chunk){
            res.write(chunk);
        });

        stream.on('end',function(){
            res.end();
        });

        stream.on('error',function(){
            res.end();
        });
    });

}).listen(8080);

console.log("Hello World start listen on port 8080");