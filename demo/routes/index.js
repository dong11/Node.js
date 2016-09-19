var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', {title:'用户登陆'});
});

router.post('/login', function (req, res, next) {
  var user = {
    username:'admin',
    password:'admin'
  }
  if(req.body.username === user.username && req.body.password === user.password){
    //req.session.user = user;
    return res.redirect('/home');
  } else {
    //req.session.error = '用户名或密码不正确';
    return res.redirect('/login');
  }
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Home'});
});

router.get('/logout', function (req, res, next) {
  //req.session.user = null;
  res.redirect('/');
});

module.exports = router;
