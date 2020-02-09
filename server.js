var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var mysql = require('mysql');

var con = mysql.createConnection(config.database);

con.connect(function(err) {
   if (err) throw err;
   console.log("Connected to mysql!");
});

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || config.server.port;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use('/:url', express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
   res.status(200).render('home', {
      title: 'Goose Database',
      layout: 'main'
   })
});

app.get('/recipe', function (req, res, next) {
   var testRecipe = require('./testRecipe');
   var recipeInfo = testRecipe.recipe;
   var ingredients = testRecipe.ingredients;
   var instructions = testRecipe.instructions;
   res.status(200).render('recipe', {
      title: recipeInfo.title,
      recipe: recipeInfo,
      ingredient: ingredients,
      instruction: instructions,
      layout: 'main'
   })
});



app.get('*', function (req, res) {
  res.status(404).render('404.handlebars', {
     title: '404',
     layout: 'main'
  });
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
});
