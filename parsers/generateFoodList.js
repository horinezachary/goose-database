var fs = require('fs');
var corpora = require('corpora-project');
const files = [
   corpora.getFile('foods', 'apple_cultivars'),
   corpora.getFile('foods', 'breads_and_pastries'),
   corpora.getFile('foods', 'condiments'),
   corpora.getFile('foods', 'fruits'),
   corpora.getFile('foods', 'herbs_n_spices'),
   corpora.getFile('foods', 'hot_peppers'),
   corpora.getFile('foods', 'pizzaToppings'),
   corpora.getFile('foods', 'sandwiches'),
   corpora.getFile('foods', 'tea'),
   corpora.getFile('foods', 'vegetables'),
]
var manual = require('./manualAddFoods.json')
createJSON();
function createJSON() {
   var foods = [];
   for (var i = 0; i < files.length; i++) {
      Object.values(files[i]).length
      for (var j = 1; j < Object.values(files[i]).length; j++) {
         for (var k = 0; k < Object.values(files[i])[j].length; k++) {
            if (i == 7) {
               foods.push(Object.values(Object.values(files[i])[j])[k].name);
            } else {
               foods.push(Object.values(Object.values(files[i])[j])[k]);
            }
         }
      }
   }
   for (var i = 0; i < manual.length; i++) {
      foods.push(manual[i]);
   }
   fs.writeFile("./foods.json", JSON.stringify(foods),function(err, result) {if(err) console.log('error', err);});
}

module.exports = {
   generateFoods: function() {
      return createJSON();
   }
}
