const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const wrapper = require('custom-request-wrapper');
const log4js = require('log4js');

const hostname = '127.0.0.1';
const port = 3000;

var recipeEnt = require('./entities/recipeEntity');
var app = express();
var recipes = [
	{
		id: 1, 
		name: 'First', 
		author:'me'
	}
]

log4js.configure({appenders: {
    	everything: { type: 'file', filename: './log/app.log' }
	},
	categories: {
		default: { appenders: [ 'everything' ], level: 'debug' }
	}
});

logger = log4js.getLogger();
logger.level = 'debug';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/create', function(req, resp){
	var recipe = wrapper.wrap(recipeEnt, req);
	logger.debug('Created a recipe: ', recipeEnt);
	recipes.push(recipe);
	resp.render('index', {
		title: 'Hello world',
		recipes: recipes
	});
});

app.get('/', function(req, resp){
	resp.render('index', {
		title: 'Hello world',
		recipes: recipes
	});
		
});

app.listen(port, function(){
	console.log('Server started on port ' + port);
});
