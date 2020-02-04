var ingredient = require('./parseIngredients.js');

var jsonIn = require('./jsonOut.json');


console.log(Object.values(jsonIn).length);

for (q = 0; q < jsonIn.length; q++) {
   console.log("---"+q+"---");
   console.log(getRecipeData(jsonIn[q]));
   console.log(getIngredients(jsonIn[q]));
   console.log(getInstructions(jsonIn[q]));
}

function getRecipeData(recipe) {
   var ret = [];
   ret.push(recipe.title);
   ret.push(recipe.time);
   return ret;
}
function getIngredients(recipe) {
   var ret = [];
   var ingredients = Object.values(recipe.ingredients);
   for (r = 0; r < ingredients.length; r++) {
      ret.push(ingredient.parse(ingredients[r]));
   }
   return ret;
}

function getInstructions(recipe) {
   var ret = [];
   var res = recipe.directions.split("\n");
   for (r = 0; r < res.length; r++) {
      var itemNum = r+1;
      var dir = res[r];
      ret.push({itemNum,dir});
   }
   return ret;
}
