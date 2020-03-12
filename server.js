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

app.get('/replicator',async function (req,res,next){
   // Set up our vars
   var ingredients = []
   var recipeName = ['Ares IV Special','USS Billings Special', 'Columbus Special', 'Copernicus Special', 'USS Dauntless Special', 'USS Defiant Special', 'USS Enterprise Special', 'Fesarius Special', 'Galileo Special', 'Gomtuu Special', 'USS Okinawa Special', 'USS Raven Special', 'SS Beagle Special', 'USS Franklin Special', 'USS Voyager Special']

   // Name our 'recipe'
   recipeName = recipeName[Math.floor(Math.random() * recipeName.length - 1)];

   // Grab all the food catagories
   var food_category = await con.asyncQuery(`SELECT id FROM food_category`,[]);
   food_category = food_category[0];

   // Grab a random number of ingredients
   var num_ingredients = Math.floor(Math.random() * 7) + 4;// Min 3 Ingredients, Max 10

   // For every ingredient pick a category
   for (let i = 0; i < num_ingredients; i++) {
      var ingredient = Math.floor(Math.random() * food_category.length - 1);
      var choices = await con.asyncQuery(`SELECT description FROM food WHERE food_category_id = ${ingredient}`,[]);
      choices = choices[0];
      var choice = choices[Math.floor(Math.random() * choices.length - 1)]
      if(choice){// In case we get a NULL entry
         ingredients.push({name: choice.description});
      }
      else{// Try again
         i--;
      }
   }

   // Create some instructions
   var instructions = [{step: 1,text: 'Put ingredients into the replicator'},{step: 2,text: 'Select \'food\''},{step: 3,text: `Input ${recipeName}`},{step: 4,text: 'Enjoy!'}];

   // Finalize the recipe
   var recipe = {title: recipeName,author_name: 'GooseDB',date: 'Today',prep_time: 'None',cook_time: '6 seconds',yield: '1',url: '/replicator', site_title: 'Here!'}

   // Render the recipe
   res.status(200).render('recipe', {
      title: recipeName,
      recipe: recipe,
      layout: 'main',
      ingredient: ingredients,
      instruction: instructions
   });
});

app.get('/recipe/:r', function (req, res, next) {
   var recipeId = req.params.r;
   con.query(`SELECT * FROM recipe NATURAL JOIN author NATURAL JOIN site WHERE recipe_id = ${recipeId}`, function (err, recipe) {
      con.query(`SELECT * FROM ingredient_row NATURAL JOIN ingredient NATURAL JOIN measurement WHERE recipe_id = ${recipeId} ORDER BY list_order`, function (err, ingredients) {
         con.query(`SELECT * FROM instruction WHERE recipe_id = ${recipeId} ORDER BY step`, function (err, instructions) {
            res.status(200).render('recipe', {
               title: recipe[0].title,
               recipe: recipe[0],
               ingredient: ingredients,
               instruction: instructions,
               layout: 'main'
            });
         });
      });
   });
});

app.get('/ingredient/:i', function (req, res, next) {
   var ingredientId = req.params.i;
   con.query(`SELECT * FROM ingredient WHERE ingredient_id = ${ingredientId}`, function (err, ingredient) {
      con.query(`SELECT DISTINCT recipe_id, recipe.title FROM ingredient_row NATURAL JOIN ingredient NATURAL JOIN recipe WHERE ingredient_id = ${ingredientId} LIMIT 10`, function (err, recipes) {
         console.log(ingredient[0]);
         res.status(200).render('ingredient', {
            title: ingredient[0].name,
            ingredient: ingredient[0],
            uses: recipes,
            layout: 'main'
         });
      });
   });
});

app.get('/author/:a', function (req, res, next) {
   var filler1 = false;
   var filler2 = false;
   var authorId = req.params.a;
   con.query(`SELECT * FROM author NATURAL JOIN site WHERE author_id = ${authorId}`, function (err, author) {
      con.query(`SELECT DISTINCT * FROM recipe NATURAL JOIN author NATURAL JOIN site WHERE author_id = ${authorId} GROUP BY title`, function (err, recipes) {
         if (recipes != null) {
            if (recipes.length%3>0) {
               filler1 = true;
            }
            if (3-recipes.length%3>1) {
               filler2 = true;
            }
         }
         res.status(200).render('author', {
            title: author[0].author_name,
            author: author[0],
            recipes: recipes,
            filler1: filler1,
            filler2: filler2,
            layout: 'main'
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
