var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var con = require('./sqlConfig');

con.start(config.database);

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

app.get('/recipe/:r', function (req, res, next) {
   var recipe = req.params.r;
   con.query(`SELECT * FROM recipe WHERE id = ${recipe}`, function (err, recipe) {
      con.query(`SELECT * FROM ingredient_row WHERE recipe = ${recipe} ORDER BY list_order`, function (err, ingredients) {
         con.query(`SELECT * FROM instruction WHERE recipe = ${recipe} ORDER BY step`, function (err, instructions) {
            res.status(200).render('recipe', {
               title: recipe.title,
               recipe: recipe,
               ingredient: ingredients,
               instruction: instructions,
               layout: 'main'
            });
         });
      });
   });
});

//recipe,ingredient and author are boolean variables used to set the active state
function renderSearch(searchQuery,recipe,ingredient,author, results, res) {
   var filler1 = false;
   var filler2 = false;
   if (results != null) {
      if (results.length%3>0) {
         filler1 = true;
      }
      if (3-results.length%3>1) {
         filler2 = true;
      }
   }
   res.status(200).render('search', {
      title: 'Search: '+searchQuery,
      searchQuery: searchQuery,
      recipeFocus: recipe,
      ingredientFocus: ingredient,
      authorFocus: author,
      results: results,
      filler1: filler1,
      filler2: filler2,
      layout: 'main'
   });
}

app.get('/search', function (req, res, next) {
   var searchQuery = req.query.q;
   var searchDomain = req.query.d;
   if (searchDomain == null) {
      searchDomain = "recipe";
   }
   if (searchDomain == 'recipe' || searchDomain == '') {
      console.log(searchQuery);
      con.query(`SELECT DISTINCT * FROM (SELECT * FROM recipe WHERE title LIKE '%${searchQuery.toString()}%') AS S NATURAL JOIN author NATURAL JOIN site GROUP BY title`, function(err, results) {
      //con.query(`SELECT * FROM recipe NATURAL JOIN author NATURAL JOIN site`, function(err, results) {
         console.log(results);
         renderSearch(searchQuery,true,false,false, results, res);
      });
   } else if (searchDomain == 'ingredient') {
      con.query(`SELECT DISTINCT * FROM ingredient WHERE name LIKE '%${searchQuery.toString()}% GROUP BY title' `, function(err, results) {
         console.log(results);
         renderSearch(searchQuery,false,true,false, results, res);
      });
   } else if (searchDomain == 'author') {
      con.query(`SELECT DISTINCT * FROM author WHERE author_name LIKE '%${searchQuery.toString()}% GROUP BY title' `, function(err, results) {
      //con.query(`SELECT * FROM author NATURAL JOIN site`, function(err, results) {
         console.log(results);
         renderSearch(searchQuery,false,false,true, results, res);
      });
   }
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
