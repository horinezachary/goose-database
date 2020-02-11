const readline = require("readline");
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var arrIn = require('./unknownWords.json');
var manualAddFoods = require('./addFoods.json');

rl.question("Start index? " , function(i) {
   i = parseInt(i);
   element(manualAddFoods,arrIn,i);
});


function element(addFoods,arr,i) {
   rl.question(`Is ${arr[i]} a food? `, function(ans) {
      console.log(i);
      if (ans == "q") {
         fs.writeFile("./addFoods.json", JSON.stringify(addFoods)+"\n",function(err, result) {if(err) console.log('error', err);});
         console.log(addFoods);
         rl.close(addFoods);
      }
      if (ans == "y") {
         addFoods.push(arr[i]);
         console.log(addFoods.length);
      }
      element(addFoods,arr,i+1);
      if (i == arr.length-1) {
         fs.writeFile("./addFoods.json", JSON.stringify(addFoods)+"\n",function(err, result) {if(err) console.log('error', err);});
         rl.close();
      }
   });
}

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
});
