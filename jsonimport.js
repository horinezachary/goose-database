var ingredient = require('./parseIngredients.js');

var jsonIn = require('./jsonOut.json');


function getIngredients(recipe) {
   var ingredients = Object.values(recipe.ingredients);
   for (r = 0; r < ingredients.length; r++) {
      console.log(ingredients[r]);
      console.log(ingredient.parse(ingredients[r]));
   }
}

function getInstructions(recipe) {
   var res = recipe.directions.split("\n");
   for (r = 0; r < res.length; r++) {
      console.log(r+1+". "+res[r]);
   }
}
