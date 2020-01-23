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
   var recipe = {title: "Test", author: "John Doe", date: "11/01/2012", preptime: "15 minutes", cooktime: "20 minutes", servings: 8, source: "allrecipes.com", sourceLink: "https://www.allrecipes.com/recipe/214614/chicken-parmesan-pasta-casserole/"};
   var ingredients = {1:{size: 1, measurement: "cup", name: "sugar"}};
   var instructions = {1:{step: 1, text: "Add one cup of sugar to the bowl."}};
   res.status(200).render('recipe', {
      title: 'Test Recipe',
      recipe: recipe,
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
