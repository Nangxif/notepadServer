var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//加载body-parser用来处理post提交过来的数组
var bodyParser = require('body-parser');
var logger = require('morgan');//HTTP请求日志中间件

var settingRouter = require('./routes/setting');
var usersRouter = require('./routes/users');
var fnRouter = require('./routes/function');
var friendRouter = require('./routes/friend');

var app = express();//创建一个Express应用，express()是一个由express模块导出的入口

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views的目录，_dirname全局变量表示当前执行脚本所在的目录
app.set('view engine', 'jade');//设置渲染引擎

app.use(logger('dev'));
app.use(bodyParser.json());//解析JSON格式的post参数
// app.use(express.urlencoded({ extended: false }));//解析urlencoded编码的post参数，URLEncoded编码中，所有的字符均为ASCII编码
app.use(cookieParser());//cookie设置
app.use(express.static(path.join(__dirname, 'public')));//静态目录设置
//bodyparser设置,添加了这个方法之后自动在api.js里面的post方法中的req添加body属性
app.use(bodyParser.urlencoded({extended:false}));//这里为true的话，post请求的body一直为空


//解决跨域的问题，允许所有源的访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
})

//根据不同的功能划分模块
app.use('/setting', settingRouter);
app.use('/users', usersRouter);
app.use('/fn', fnRouter);
app.use('/friend',friendRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
