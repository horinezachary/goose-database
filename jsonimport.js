var ingredient = require('./parseIngredients.js');

var jsonIn = require('./jsonOut.json');


function getIngredients(recipe) {
   var ingredients = Object.values(recipe.ingredients);
   for (r = 0; r < ingredients.length; r++) {
      console.log(ingredients[r]);
      console.log(ingredient.parse(ingredients[r]));
   }
}
