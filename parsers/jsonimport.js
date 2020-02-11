var ingredient = require('./parseIngredients.js');
var format = require('./formatter.js');
var fs = require('fs');
var jsonIn = require('./jsonOut.json');

var totalEntries = 0;

var alldata = [];

for (q = 0; q < jsonIn.length; q++) {
   console.log("---"+q+"---");
   var rec = getRecipeData(jsonIn[q]);
   var ing = getIngredients(jsonIn[q]);
   var ins = getInstructions(jsonIn[q]);
   var entries = ing.length + ins.length + 1;

   //console.log("Entries: "+entries);
   //console.log(rec);
   //console.log(ing);
   //console.log(ins);
   alldata.push({"title": rec[0], "time": rec[1],"ingredients": ing, "instructions": ins});
   totalEntries+=entries;
}

fs.writeFile("./output/parsed.json", JSON.stringify(alldata),function(err, result) {if(err) console.log('error', err);});

console.log(format.box("File In: "+"jsonOut.json"+"\n"+
                       "File Out: "+"/output/parsed.json"+"\n"+
                       "Total Recipes: "+Object.values(jsonIn).length+"\n"+
                       "Total Entries: "+totalEntries+"\n"+
                       "Average per Recipe: "+totalEntries/Object.values(jsonIn).length));

function getRecipeData(recipe) {
   var ret = [];
   ret.push(recipe.title.trim());
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
      var step = r+1;
      var text = res[r];
      ret.push({"step":step,"text":text});
   }
   return ret;
}
