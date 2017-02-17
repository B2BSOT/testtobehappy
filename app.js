
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , methodOverride = require('method-override')
  , serveStatic = require('serve-static')
  , errorhandler = require('errorhandler')
  , favicon = require('serve-favicon')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  ;
  
var app = express();

/*
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  user : 'admin',
  password : 'happyappdb',
  database : 'mysqldb',
  host : 'b2bdb.ciae2wm5rkuu.us-west-2.rds.amazonaws.com' //port빼고 end-point
});
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(morgan());
//app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(app.router);
app.use(serveStatic(__dirname + '/public'));
app.use(serveStatic(__dirname + '/semantic'));
  
// development only 
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

var mysql = require('mysql');

var connection = mysql.createConnection({
  user : 'admin',
  password : 'happyappdb',
  database : 'mysqldb',
  host : 'b2bdb.ciae2wm5rkuu.us-west-2.rds.amazonaws.com', //port빼고 end-point
  port : '3306'
});

//app.get('/', routes.index);
var index = require('./routes/index')(app, connection);

// main route file 사용
var main = require('./routes/main'); // set route file
app.use('/main', main); // url에 /main 으로 사용

//hdmain이라는 변수는 /routes/hdmain.js 를 컨트롤 할수 있음
var hdmain = require('./routes/hdmain');

// /hdmain이라는 도메인(url)이 들어오면 두번째 파라메터이있는 routes 파일을 사용하겠다는 선언
app.use('/hdmain', hdmain);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;