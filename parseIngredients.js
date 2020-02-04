const weight = ["pound","ounce"];
const weightAbbr = ["lb", "oz"];
const volume = ["gallon", "quart", "pint", "cup", "fluid ounce", "tablespoon", "teaspoon", "milliliter", "liter"];
const volumeAbbr = ["gal","qt","pt","cp","floz","tbsp","tsp","ml","l"];
const length = ["inch","centimeter"];
const lengthAbbr = ["in", "cm"];
const other = ["piece"];
const otherAbbr = ["pc"];
const defaultmeasurement = "unit";

console.log(parseIngredient("12 fluid ounces milk"));
console.log(parseIngredient("1/2 of an ass"));
console.log(parseIngredient("1 2oz fart"));
console.log(parseIngredient("3 2oz yogurts"));
console.log(parseIngredient("1 cup of brandy"));



function parseIngredient(string) {
   var num = 1;
   var measurement;
   var ingredient = "";
   var consumed = 0;
   var arr = string.split(" ");
   if (getNumber(arr[0]) != false) {
      num = getNumber(arr[0]);
      consumed++;
   }
   else {
      var ret = checkCombined(arr[0], arr[1]);
      if (ret != false) {
         num = num * ret[0];
         measurement = ret[1];
         consumed++;
         if(ret[1] == volume[4]) {
            consumed++;
         }
      }

   }
   measurement = isMeasurement(arr[1], arr[2]);
   if (measurement == -1) {
      var ret = checkCombined(arr[1], arr[2]);
      if (ret != false) {
         num = num * ret[0];
         measurement = ret[1];
         consumed++;
         if(ret[1] == volume[4]) {
            consumed++;
         }
      }
      else {
         measurement = defaultmeasurement;
      }
   }
   else {
      consumed++;
      if(measurement == volume[4]) {
         consumed++;
      }
   }
   for (i = consumed; i < arr.length; i++) {
      //TODO: check for ignored words
      ingredient += " " + arr[i];
   }
   return "Parse: " + num + ", " + measurement + ", " + ingredient;
}

function isNumber(str) {
   if (str == str.match(/^[0-9.\/]*$/g)) {
      return true;
   }
   else {
      return false;
   }
}

function getNumber(str) {
   if (str.includes("/")) {
      //fraction
      var arr = str.split("/");
      if (getNumber(arr[0]) && getNumber(arr[1])){
         var num = arr[0]/arr[1];
         return num;
      }
   }
   if (isNumber(str)) {
      return parseFloat(str,10);
   } else {
      return false;
   }
}

function isMeasurement(str1, str2) {
   if (str1.match(/^(fluid)$|^(fl)[.]{0,1}$/)) {
      if (str2.match(/^(ounce)[s]{0,1}$|^(oz)[.]{0,1}$/)) {
         //fluid oz
         return volume[4];
      } else return -1;
   }
   for (i = 0; i < volume.length; i++) {
      if (str1.match('^('+volume[i]+')[s]{0,1}$|^('+volumeAbbr[i]+')[s]{0,1}[.]{0,1}$')) {
         //is volume
         return volume[i];
      }
   }
   for (i = 0; i < weight.length; i++) {
      if (str1.match('^('+weight[i]+')[s]{0,1}$|^('+weightAbbr[i]+')[s]{0,1}[.]{0,1}$')) {
         //is weight
         return weight[i];
      }
   }
   for (i = 0; i < length.length; i++) {
      if (str1.match('^('+length[i]+')[e]{0,1}[s]{0,1}$|^('+lengthAbbr[i]+')[s]{0,1}[.]{0,1}$')) {
         //is length
         return length[i];
      }
   }
   for (i = 0; i < other.length; i++) {
      if (str1.match('^('+other[i]+')[e]{0,1}[s]{0,1}$|^('+otherAbbr[i]+')[s]{0,1}[.]{0,1}$')) {
         //is other
         return other[i];
      }
   }
   return -1;
}

function checkCombined(str1, str2) {
   if (str1.length == 0) {
      return false;
   }
   //var split = str1.split(str1.indexOf(str1.match(/[a-z]/)));
   var split1 = str1.slice(0,str1.indexOf(str1.match(/[a-z]/)));
   var split2 = str1.slice(str1.indexOf(str1.match(/[a-z]/)));
   var num = getNumber(split1);
   if (num == false) {
      return false;
   }
   measurement = isMeasurement(split2, str2);
   if (measurement == -1) {
      var ret = checkCombined(split2.slice(1), "");
      if (ret != false) {
         num = num * ret[0];
         measurement = ret[1];
      }
      else {
         return false;
      }
   }
   return [num,measurement];
}
