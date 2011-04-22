var express = require('express');
var app = express.createServer();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/screenies');
require('./models.js');

var Comparison = mongoose.model('Comparison');

app.configure(function(){
	app.use(express.logger());
//	app.use(express.bodyDecoder());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
//	app.use(express.staticProvider(__dirname + '/public'));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/list', function(req, res) {
	Comparison.find({}, function(err, docs) {
		res.send('hi');

	});
});

app.listen(3000);
console.log('Express server started on port %s', app.address().port);
