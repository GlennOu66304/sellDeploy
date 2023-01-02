var express = require('express');


var app = express();

var router = express.Router();
router.get('/', function(req,res,next){
	req.url = '/index.html';
	next();
});

app.use(router);



// 接口数据
// 1、读取json数据
var goods = require('./data/01-商品页(点菜).json');
var ratings = require('./data/02-商品页(评价).json');
var seller = require('./data/03-商品页(商家).json');

// 2、路由
var routes = express.Router();

// 3、编写接口
routes.get('/goods', (req,res) => {
	// 返回数据给客户端，返回json数据
	res.json(goods);
});
routes.get('/ratings', (req,res) => {
	// 返回数据给客户端，返回json数据
	res.json(ratings);
});

routes.get('/seller', (req,res) => {
	// 返回数据给客户端，返回json数据
	res.json(seller);
});

// 4、中间件
app.use('/api',routes);


// 定义static目录，指向./dist目录
app.use(express.static('./dist'));

// How to deploy Node.js app on Heroku from GitHub ?
// https://www.geeksforgeeks.org/how-to-deploy-node-js-app-on-heroku-from-github/

// 启动express
// module.express = app.listen(port, function(err){
	// Heroku + node.js error (Web process failed to bind to $PORT within 60 seconds of launch)
	// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
	// Default web process type
	// https://devcenter.heroku.com/articles/nodejs-support#default-web-process-type
	// Heroku missing required flag: -a
	// https://wajeeh-ahsan.medium.com/heroku-missing-required-flag-a-bfc7ba0a00f5
app.listen(process.env.PORT|| 5000, function(err){
	if(err){
		console.log(err);
		return;
	}
	
	console.log('http://localhost:' + 5000 + '\n');
});
