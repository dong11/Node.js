目标
    建立一个 lesson3 项目，在其中编写代码。
    当在浏览器中访问 http://localhost:3000/ 时，输出 CNode(https://cnodejs.org/ ) 社区首页的所有帖子标题和链接，以 json 的形式。
    输出示例：
        [
          {
            "title": "【公告】发招聘帖的同学留意一下这里",
            "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12"
          },
          {
            "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
            "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f"
          }
        ]
        
挑战
    访问 http://localhost:3000/ 时，输出包括主题的作者
    示例：
        [
          {
            "title": "【公告】发招聘帖的同学留意一下这里",
            "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
            "author": "alsotang"
          },
          {
            "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
            "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
            "author": "otheruser"
          }
        ]

知识点
    1.学习使用 superagent 抓取网页
    2.学习使用 cheerio 分析网页
    // superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。
    // cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。
    
内容:
    1.需要用到三个依赖，分别是 express，superagent 和 cheerio。
    2.生成app.js,创建服务
    
        app.get('/', function (req, res, next) {
          // 用 superagent 去抓取 https://cnodejs.org/ 的内容
          superagent.get('https://cnodejs.org/')
            .end(function (err, sres) {
              // 常规的错误处理
              if (err) {
                return next(err);
              }
              // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
              // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
              // 剩下就都是 jquery 的内容了
              var $ = cheerio.load(sres.text);
              var items = [];
              $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                  title: $element.attr('title'),
                  href: $element.attr('href')
                });
              });
        
              res.send(items);
            });
        });