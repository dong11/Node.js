/**
 * Created by dong on 16/9/28.
 */
var fs = require('fs');

function copy(src, dst){
    // 小文件拷贝
    // fs.readFileSync从源路径读取文件内容，并使用fs.writeFileSync将文件内容写入目标路径。
    //fs.writeFileSync(dst, fs.readFileSync(src));

    // 大文件拷贝
    // 使用fs.createReadStream创建了一个源文件的只读数据流，
    // 并使用fs.createWriteStream创建了一个目标文件的只写数据流，
    // 并且用pipe方法把两个数据流连接了起来。
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}
// process是一个全局变量，可通过process.argv获得命令行参数。
// 由于argv[0]固定等于NodeJS执行程序的绝对路径，
// argv[1]固定等于主模块的绝对路径，
// 因此第一个命令行参数从argv[2]这个位置开始。
main(process.argv.slice(2));  // slice(2) 返回从第三个元素(下标为2)开始的数组
//node day3.js 源文件路径 目标文件路径
