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
   var recipe = {title: "Soy-Braised Chicken Wings", author: "John Doe", date: "11/01/2012", preptime: "15 minutes", cooktime: "20 minutes", servings: 8, source: "allrecipes.com", sourceLink: "https://www.allrecipes.com/recipe/214614/chicken-parmesan-pasta-casserole/"};
   var ingredients = [{ size: 6,
    measurement: 'inch',
    text: 'pieces ginger, scrubbed, thinly sliced, divided' },
  { size: 0.5,
    measurement: 'cup',
    text: 'dark soy sauce, divided' },
  { size: 2,
    measurement: 'teaspoon',
    text: 'Five-Spice Powder, divided' },
  { size: 1,
    measurement: 'unit',
    text: '20-24 chicken wing pieces (about 2½ lb.)' },
  { size: 3,
    measurement: 'tablespoon',
    text: 'vegetable or sunflower oil' },
  { size: 1, measurement: 'unit', text: 'shallot, thinly sliced' },
  { size: 3,
    measurement: 'unit',
    text: 'scallions, roots trimmed, halved crosswise' },
  { size: 5, measurement: 'unit', text: 'garlic cloves, smashed' },
  { size: 1,
    measurement: 'unit',
    text: 'red finger or Fresno chile, halved lengthwise' },
  { size: 3,
    measurement: 'ounce',
    text: 'Chinese rock or lump sugar or ¼ cup raw sugar' },
  { size: 3, measurement: 'unit', text: 'whole staranise' },
  { size: 2,
    measurement: 'piece',
    text: 'dried licorice root (optional)' },
  { size: 4,
    measurement: 'gram',
    text: 'cassia or cinnamon stick' },
  { size: 0.25,
    measurement: 'teaspoon',
    text: 'freshly ground white pepper (optional)' },
  { size: 0.25,
    measurement: 'teaspoon',
    text: 'Sichuan peppercorns' },
  { size: 0.5, measurement: 'cup', text: 'low-sodium soy sauce' },
  { size: 0.25, measurement: 'cup', text: 'unseasoned rice wine' },
  { size: 1,
    measurement: 'unit',
    text: 'Thickly sliced cucumbers (for serving; optional)' }];
   var instructions = [ { step: 1,
    text: 'Mix half of ginger, ¼ cup dark soy sauce, and 1 tsp. Five-Spice Powder in a medium bowl. Add wings; toss to coat. Cover and chill at least 1 hour and up to 8 hours.' },
  { step: 2,
    text: 'Heat oil in a wok or large deep-sided skillet over medium-high. Add shallot, scallions, garlic, chile, and remaining ginger and cook, stirring, until fragrant, about 2 minutes. Add rock sugar, star anise, licorice root (if using), cassia, white pepper (if using), Sichuan peppercorns, and remaining 1 tsp. Five-Spice Powder and stir to combine. Pour in low-sodium soy sauce, remaining ¼ cup dark soy sauce, and 1 cup water. Bring to a boil, then reduce heat to medium-low.' },
  { step: 3,
    text: 'Lift chicken wings out of marinade; discard marinade. Add wings to wok and pour wine over. Stir gently, then bring to a simmer. Cover and cook over medium-low 15 minutes. Gently stir, then cover again and continue cooking until chicken is cooked through and a deep brown color, about 15 minutes longer. Using a spider or slotted spoon, transfer wings to a plate.' },
  { step: 4,
    text: 'Pour liquid in wok through a fine-mesh sieve into a small bowl; discard solids. Return strained liquid to wok and bring to a simmer over medium-high. Cook until sauce thickly coats a spoon, 10-12 minutes. Return chicken wings to sauce and toss to coat. Using a spider or slotted spoon, transfer to a platter. Serve with cucumbers if using.' } ];
   res.status(200).render('recipe', {
      title: recipe.title,
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
