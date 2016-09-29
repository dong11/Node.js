目标
    建立一个 lesson2 项目，在其中编写代码。
    当在浏览器中访问 http://localhost:3000/?name=hwongrex 时，
        输出 hwongrex 的 md5 值，即 bdd5e57b5c0040f9dc23d430846e68a3。

挑战
    访问 http://localhost:3000/?name=hwongrex 时，
    输出 hwongrex 的 sha1 值，即 e3c766d71667567e18f77869c65cd62f6a1b9ab9。

知识点
    学习 req.query 的用法
    学习建立 package.json 来管理 Node.js 项目。
    
    package.json: 定义了项目的各种元信息，包括项目的名称，git repo 的地址，作者等等。
                  最重要的是，其中定义了我们项目的依赖，这样这个项目在部署时，我们就不必将 node_modules 目录也上传到服务器，
                  服务器在拿到我们的项目时，只需要执行 npm install，则 npm 会自动读取 package.json 中的依赖并安装在项目的 node_modules 下面，
                  然后程序就可以在服务器上跑起来了。
   
    
1.生成package.json
    $ npm init
    
2.安装依赖, 依赖 express 和 utility 两个模块。
    $ npm install express utility --save
    // 多了个 --save 参数，这个参数的作用，就是会在你安装依赖的同时，自动把这些依赖写入 package.json

3.生成app.js,并创建服务
    $ touch app.js

4.创建服务

    // 引入依赖
    var express = require('express');
    var utility = require('utility');
    
    // 建立 express 实例
    var app = express();
    
    app.get('/', function (req, res) {
      // 从 req.query 中取出我们的 name 参数。
      // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
      // 如果分不清什么是 query，什么是 body 的话，那就需要补一下 http 的知识了
      var name = req.query.name;
    
      // 调用 utility.md5 方法，得到 md5 之后的值
      // 之所以使用 utility 这个库来生成 md5 值，其实只是习惯问题。每个人都有自己习惯的技术堆栈，
      // utility 的 github 地址：https://github.com/node-modules/utility
      // 里面定义了很多常用且比较杂的辅助方法，可以去看看
      var md5Value = utility.md5(name);
    
      res.send(md5Value);
    });
    
    app.listen(3000, function (req, res) {
      console.log('app is running at port 3000');
    });