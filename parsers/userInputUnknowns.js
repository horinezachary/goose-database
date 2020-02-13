const readline = require("readline");
const colors = require('colors');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var foods = require('./foods.json');
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
   rl.question(`What is \"${arr[i]}\"? (${"F".underline.brightBlue}ood,${"A".underline.brightBlue}dverb,`+
                                        `A${"d".underline.brightBlue}jective,${"C".underline.brightBlue}onnector,`+
                                        `${"V".underline.brightBlue}erb, ${"I".underline.brightBlue}gnored `+
                                         `or ${"s".underline.brightBlue}plit): `, function(ans) {
      console.log(i);
      var working = true;
      var found = false;
      var j = 0;
      while(working) {
         if (j >= foods.length){
            working = false;
         } else if (arr[i] == foods[j]) {
            working = false;
            found = true;
         }
         j++;
      }

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
      if (ans == "s") {
         for (var j = 0; j < arr[i].split(" ").length; j++) {
            arr.splice(i+1,0,arr[i].split(" ")[j]);
         }
      }
      if (ans == "d") {
         adjectives.push(arr[i]);
      }
      if (ans == "v") {
         verbs.push(arr[i]);
      }
      if (ans == "a") {
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
