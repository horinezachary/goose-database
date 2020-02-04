var ingredient = require('./parseIngredients.js');

var jsonIn = require('./jsonOut.json');


var totalEntries = 0;

for (q = 0; q < jsonIn.length; q++) {
   var rec = getRecipeData(jsonIn[q]);
   var ing = getIngredients(jsonIn[q]);
   var ins = getInstructions(jsonIn[q]);
   var entries = ing.length + ins.length + 1;

   console.log("---"+q+"---");
   console.log("Entries: "+entries);
   console.log(rec);
   console.log(ing);
   console.log(ins);

   totalEntries+=entries;
}

console.log(boxFormat("File: "+"jsonOut.json"+"\n"+
                      "Total Recipes: "+Object.values(jsonIn).length+"\n"+
                      "Total Entries: "+totalEntries+"\n"+
                      "Average per Recipe: "+totalEntries/Object.values(jsonIn).length));

function boxFormat(str) {
   var strs = str.split("\n");
   var longestLength = 0;
   for (i = 0; i < strs.length; i++) {
      if (strs[i].length > longestLength) {
         longestLength = strs[i].length;
      }
   }
   var longestLabel = 0;
   for (i = 0; i < strs.length; i++) {
      if (strs[i].split(": ")[0].length > longestLabel) {
         longestLabel = strs[i].split(": ")[0].length+2;
      }
   }
   var data = "";
   for (i = 0; i < strs.length; i++) {
      var first = strs[i].split(": ")[0]+": ";
      var second = strs[i].split(": ")[1];
      var spc = "";
      for (j = 0; j < longestLabel-(first.length); j++) {
         spc+=" ";
      }
      var label = spc+first;
      spc = ""
      for (j = 0; j < longestLength-(label.length+second.length); j++) {
         spc+=" ";
      }
      data+=("│"+label+second+spc+"│\n");
   }
   var dashstr = "";
   for (i = 0; i < longestLength; i++) {
      dashstr+="─";
   }
   return ("┌"+dashstr+"┐\n"+data+"└"+dashstr+"┘");
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
