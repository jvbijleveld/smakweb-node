const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const wrapper = require('custom-request-wrapper');

var app = express();
const hostname = '127.0.0.1';
const port = 3000;


var logger = function(req, resp, next){
	console.log('Logging...');
	next();
}

var recipeEnt = require('./entities/recipeEntity');

//app.use(logger);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/create', function(req, resp){
	console.log('Got request: ' + req.body.name);
	var recipe = wrapper.wrap(recipeEnt, req);
	console.log('Parsed request: ' + recipe.name);
	
	resp.send(recipe);
	
});

app.get('/', function(req, resp){
	resp.render('index', {
		title: 'Hello world'	
	});
		
});

app.listen(port, function(){
	console.log('Server started on port ' + port);
});
