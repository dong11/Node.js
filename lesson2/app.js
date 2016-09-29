var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res){
    var name = req.query.name;
    //var md5Value = utility.md5(name);
    //res.send(md5Value);
    if(name == undefined) {
        res.send();
        return;
    }
    var sha1Value = utility.sha1(name);
    res.send(sha1Value);
});

app.listen(3000, function(){
    console.log('app is running at port 3000');
});
