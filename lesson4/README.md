## 《使用 eventproxy 控制并发》
目标
    建立一个 lesson4 项目，在其中编写代码。
    代码的入口是 app.js，当调用 node app.js 时，它会输出 CNode(https://cnodejs.org/ ) 
        社区首页的所有主题的标题，链接和第一条评论，以 json 的格式。
    输出示例：
    
    [
      {
        "title": "【公告】发招聘帖的同学留意一下这里",
        "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
        "comment1": "呵呵呵呵"
      },
      {
        "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
        "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
        "comment1": "沙发！"
      }
    ]
    
挑战
    以上文目标为基础，输出 comment1 的作者，以及他在 cnode 社区的积分值。
    示例：
    [
      {
        "title": "【公告】发招聘帖的同学留意一下这里",
        "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
        "comment1": "呵呵呵呵",
        "author1": "auser",
        "score1": 80
      },
      ...
    ]

知识点
    1.体会 Node.js 的 callback hell 之美
    2.学习使用 eventproxy 这一利器控制并发
    
内容:
    1.需要用到三个库：superagent cheerio eventproxy(https://github.com/JacksonTian/eventproxy )
    
    2.抓取topicURL:
        var cnodeUrl = 'https://cnodejs.org/';
        superagent.get(cnodeUrl)
          .end(function (err, res) {
            if (err) {
              return console.error(err);
            }
            var topicUrls = [];
            var $ = cheerio.load(res.text);
            // 获取首页所有的链接
            $('#topic_list .topic_title').each(function (idx, element) {
              var $element = $(element);
              // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
              // 我们用 url.resolve 来自动推断出完整 url，变成
              // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
              // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
              var href = url.resolve(cnodeUrl, $element.attr('href'));
              topicUrls.push(href);
            });
        
            console.log(topicUrls);
          });
    3.遍历每个topicURL
      利用eventproxy事件监听
      eventproxy使用:
        1.先 var ep = new eventproxy(); 得到一个 eventproxy 实例。
        2.告诉它你要监听哪些事件，并给它一个回调函数。ep.all('event1', 'event2', function (result1, result2) {})。
        3.在适当的时候 ep.emit('event_name', eventData)。