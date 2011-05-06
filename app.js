var express = require('express');
var sys = require('sys');
var fs = require('fs');
var formaline = require('formaline');

var app = express.createServer();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/screenies');
require('./models.js');

var Comparison = mongoose.model('Comparison');

app.configure(function(){
	app.use(express.logger());
	app.use(express.bodyParser());
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

app.post('/upload', function(req, res) {
	formFormaline = new formaline({
		logging: 'debug:on',
		uploadRootDir: '/tmp',
	});

	formFormaline.on('filereceived', function(sha1name, orig, dir, type, size, field, sha1sum) {
		console.log(orig);
	});
	formFormaline.on('end', function(incompleteFiles, stats, res, next) {
		res.send('done');
	});


	formFormaline.parse(req, res, function() {});

});

app.get('/comparison', function(req, res) {
	
});

app.get('/list', function(req, res) {
	Comparison.find({}, function(err, docs) {
		res.send(sys.inspect(docs));
	});

	c = new Comparison;
	c.title = "hi";
	c.save(function(err) {
	});
});

app.listen(3000);
console.log('Express server started on port %s', app.address().port);
