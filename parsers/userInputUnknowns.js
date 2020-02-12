const readline = require("readline");
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var arrIn = require('./unknownWords.json');
var manualAddFoods = require('./addFoods.json');
var words = require('./words.js');
var verbs = words.verbs;
var adverbs = words.adverbs;
var adjectives = words.adjectives;
var connectors = words.connectors;
var ignored = words.ignored;

rl.question("Start index? " , function(i) {
   i = parseInt(i);
   element(manualAddFoods,arrIn,i);
});


function element(addFoods,arr,i) {
   rl.question(`Is ${arr[i]} a food? `, function(ans) {
      console.log(i);
      if (ans == "q") {
         fs.writeFile("./addFoods.json", JSON.stringify(addFoods)+"\n",function(err, result) {
            if(err) console.log('error', err);
            var wordsOut = [];
            wordsOut.push({"verbs":verbs,"adverbs": adverbs, "adjectives":adjectives,"ignored":ignored,"connectors":connectors});
            fs.writeFile("./words.json", JSON.stringify(wordsOut)+"\n",function(err, result) {
               if(err) console.log('error', err);
               rl.close();
            });
         });
      }
      if (ans == "y") {
         addFoods.push(arr[i]);
      }
      if (ans == "a") {
         adjectives.push(arr[i]);
      }
      if (ans == "v") {
         verbs.push(arr[i]);
      }
      if (ans == "d") {
         adverbs.push(arr[i]);
      }
      if (ans == "c") {
         connectors.push(arr[i]);
      }
      if (ans == "i") {
         ignored.push(arr[i]);
      }
      element(addFoods,arr,i+1);
      if (i == arr.length-1) {
         fs.writeFile("./addFoods.json", JSON.stringify(addFoods)+"\n",function(err, result) {
            if(err) console.log('error', err);
            var wordsOut = [];
            wordsOut.push({"verbs":verbs,"adverbs": adverbs, "adjectives":adjectives,"ignored":ignored,"connectors":connectors});
            fs.writeFile("./words.json", JSON.stringify(wordsOut)+"\n",function(err, result) {
               if(err) console.log('error', err);
               rl.close();
            });
         });
      }
   });
}

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
});
