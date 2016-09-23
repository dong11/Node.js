# Node.js
Node.js基础学习
day1:
    创建第一个应用server
    回调接口的使用(fs:文件读取):
        Node.js 异步编程的直接体现就是回调。
        异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。
        回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。
        例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。
        这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

day2:
    1.创建一个文件服务器  
    2.主要利用http创建一个server, 使用fs创建一个文件操作流
        获取文件状态: fs.stat(path, callback)
            第一个参数是文件路径，第二个参数是回调函数。
            fs.stat()方法是异步的，结果通过回调函数callback返回。
            callback的原型如下：function(err, stats):
                第一个参数指示是否出现了错误，
                第二个参数是一个对象，类型是fs.Stats，保存了文件的状态信息，比如大小、创建时间、修改时间等。
        fs.createReadStream(path[, options])创建了一个ReadStream对象:
            第一个参数是文件路径，第二个参数是可选的JSON对象，用来指定打开文件的一些选项.
    3.EventEmitter:
        Node.js基于V8引擎实现的事件驱动IO，是其最大最棒的特色之一。
        有了事件机制，就可以充分利用异步IO突破单线程编程模型的性能瓶颈，使得用JavaScript作后端开发有了实际意义。
      EventEmitter基本使用:
        events.EventEmitter是一个简单的事件发射器的实现，具有addListener、on、once、removeListener、emit等方法，
        开发者可以很方便的调用这些API监听某个事件或者发射某个事件。
    