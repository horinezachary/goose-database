const measurement = require('./measurements.js');
const weight      = measurement.weight;
const weightAbbr  = measurement.weightAbbr;
const volume      = measurement.volume;
const volumeAbbr  = measurement.volumeAbbr;
const length      = measurement.length;
const lengthAbbr  = measurement.lengthAbbr;
const other       = measurement.other;
const otherAbbr   = measurement.otherAbbr;
const defmeasure  = measurement.defaultmeasurement;

const words = require('./words.js');
verbs = words.verbs;
adverbs = words.adverbs;
connectors = words.connectors;
ignored = words.ignored;

/*
console.log(parseIngredient("12 fluid ounces milk"));
console.log(parseIngredient("1/2 of an ass"));
console.log(parseIngredient("1 2oz fart"));
console.log(parseIngredient("3 2oz yogurts"));
console.log(parseIngredient("1 cup of brandy"));
*/


function parseIngredient(string) {
   var num = 1;
   var measurement;
   var ingredient = "";
   var consumed = 0;
   var origsString = string;
   string = removeParenthesis(string);
   var arr = string.split(" ");
   if (getNumber(arr[0]) != false) {
      num = getNumber(arr[0]);
      consumed++;
   }
   else {
      var ret;
      if (arr.length > 1) {
         ret = checkCombined(arr[0], arr[1]);
      } else if (arr.length = 1) {
         ret = checkCombined(arr[0], "");
      } else {ret = false;}
      if (ret != false) {
         num = num * ret[0];
         if (ret.length == 3) {
            measurement = ret[2];
            consumed--;
         } else {
            measurement = ret[1];
         }
         consumed++;
         if(ret[1] == volume[4]) {
            consumed++;
         }
      }

   }
   if (arr.length > 2) {
      measurement = isMeasurement(arr[1], arr[2]);
   } else if (arr.length > 1){measurement = isMeasurement(arr[1], "");
   } else {measurement = -1;}
   if (measurement == -1) {
      var ret;
      if (arr.length > 2) {
         ret = checkCombined(arr[1], arr[2]);
      } else if (arr.length > 1){ret = checkCombined(arr[1], "");}
      else {ret = false;}
      if (ret != false) {
         num = num * ret[0];
         if (ret.length == 3) {
            measurement = ret[2];
            consumed--;
         } else {
            measurement = ret[1];
         }
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
   var origarr = origsString.split(" ");
   var text = "";
   for (i = consumed; i < arr.length; i++) {
      //TODO: check for ignored words
      text += " " + origarr[i];
   }
   text = text.trim();
   return {"size":num,"measurement":measurement,"text":text};
}

function isNumber(str) {
   if (str == toString(str).match(/^[0-9.\/]*$/g)) {
      return true;
   }
   else {
      return false;
   }
}

function getNumber(str) {
   if (toString(str).includes("/")) {
      //fraction
      var arr = str.split("/");
      if (getNumber(arr[0]) && getNumber(arr[1])){
         var num = arr[0]/arr[1];
         return num;
      }
   }
   var sp = getVulgarFraction(str);
   if (sp != false) {
      return sp;
   }
   if (isNumber(str)) {
      return parseFloat(str,10);
   } else {
      return false;
   }
}

function getVulgarFraction(str) {
   containsVul = false;
   var runningTotal = 0;
   var runningNumber = 0;
   var lastNumber = true;
   if (str.length > 1) {
      for (var i = 0; i < str.length; i++) {
         var vul = vulgarFraction(str[i]);
         if (vul != false) {
            runningTotal += vul;
            containsVul = true;
            runningTotal += runningNumber;
            runningNumber = 0;
         }else {
            var char = getNumber(str[i]);
            if (char != false) {
               runningNumber = runningNumber*10 + char;
            }
         }
      }
      runningTotal += runningNumber;
   } else {
      var vul = vulgarFraction(str);
      if (vul != false) {
         runningTotal += vul;
         containsVul = true;
      }
   }
   if (containsVul) {
      return runningTotal;
   } else {
      return false;
   }
}

function vulgarFraction(str) {
   switch(str) {
      case "¼":
         return 1/4;
         break;
      case "½":
         return 1/2;
         break;
      case "¾":
         return 3/4;
         break;
      case "⅐":
         return 1/7;
         break;
      case "⅑":
         return 1/9;
         break;
      case "⅒":
         return 1/10;
         break;
      case "⅓":
         return 1/3;
         break;
      case "⅔":
         return 2/3;
         break;
      case "⅕":
         return 1/5;
         break;
      case "⅖":
         return 2/5;
         break;
      case "⅗":
         return 3/5;
         break;
      case "⅘":
         return 4/5;
         break;
      case "⅙":
         return 1/6;
         break;
      case "⅚":
         return 5/6;
         break;
      case "⅛":
         return 1/8;
         break;
      case "⅜":
         return 3/8;
         break;
      case "⅝":
         return 5/8;
         break;
      case "⅞":
         return 7/8;
         break;
      default:
         return false;
         break;
   }
}

function isMeasurement(str1) {
   //TODO: Simplify this
   str1 = str1.toLowerCase();
   if (str1.match(/^(fluid)$|^(fl)[.]?$/)) {
      return volume[4];
   }
   if (str1.match(/^(ounce)[s]?$|^(oz)[.]?$/)) {
      return volume[4];
   }
   for (var i = 0; i < volume.length; i++) {
      if (str1.match('^('+volume[i]+')[s]?$|^('+volumeAbbr[i]+')[s]?[.]?$')) {
         //is volume
         return volume[i];
      }
   }
   for (var i = 0; i < weight.length; i++) {
      if (str1.match('^('+weight[i]+')[s]?$|^('+weightAbbr[i]+')[s]?[.]?$')) {
         //is weight
         return weight[i];
      }
   }
   for (var i = 0; i < length.length; i++) {
      if (str1.match('^('+length[i]+')[e]?[s]?$|^('+lengthAbbr[i]+')[s]?[.]?$')) {
         //is length
         return length[i];
      }
   }
   for (var i = 0; i < other.length; i++) {
      if (str1.match('^('+other[i]+')[e]?[s]?$|^('+otherAbbr[i]+')[s]?[.]?$')) {
         //is other
         return other[i];
      }
   }
   return -1;
}

function getMeasurement(str1, str2) {
   str1 = str1.toLowerCase();
   str2 = str2.toLowerCase();
   if (str1.match(/^(fluid)$|^(fl)[.]?$/)) {
      if (str2.match(/^(ounce)[s]?$|^(oz)[.]?$/)) {
         //fluid oz
         return volume[4];
      } else return -1;
   }
   for (var i = 0; i < volume.length; i++) {
      if (str1.match('^('+volume[i]+')[s]?$|^('+volumeAbbr[i]+')[s]?[.]?$')) {
         //is volume
         return volume[i];
      }
   }
   for (var i = 0; i < weight.length; i++) {
      if (str1.match('^('+weight[i]+')[s]?$|^('+weightAbbr[i]+')[s]?[.]?$')) {
         //is weight
         return weight[i];
      }
   }
   for (var i = 0; i < length.length; i++) {
      if (str1.match('^('+length[i]+')[e]?[s]?$|^('+lengthAbbr[i]+')[s]?[.]?$')) {
         //is length
         return length[i];
      }
   }
   for (var i = 0; i < other.length; i++) {
      if (str1.match('^('+other[i]+')[e]?[s]?$|^('+otherAbbr[i]+')[s]?[.]?$')) {
         //is other
         return other[i];
      }
   }
   return -1;
}

function isIngredient(str) {
   //TODO: finish this
   return false;
}

function isVerb(str) {
   for (var i = 0; i < verbs.length; i++) {
      if (str == verbs[i]) {
         return verb[i];
      }
   }
   return false;
}

function isAdverb(str) {
   for (var i = 0; i < adverbs.length; i++) {
      if (str == adverbs[i]) {
         return adverbs[i];
      }
   }
   return false;
}

function isConnectorWord(str) {
   for (var i = 0; i < connectors.length; i++) {
      if (str == connectors[i]) {
         return connectors[i];
      }
   }
   return false;
}

function isGarbage(str) {
   for (var i = 0; i < ignored.length; i++) {
      if (str == ignored[i]) {
         return ignored[i];
      }
   }
   return false;
}

function spacePunctuation(str) {
   //convert to other ascii char
   while(str.includes("(")||str.includes(")")||str.includes(",")||str.includes("-")){
      str = str.replace("(","▌");
      str = str.replace(")","▐");
      str = str.replace(",","▄");
      str = str.replace("-","▀");

   }
   //convert back with spaces
   while(str.includes("▌")||str.includes("▐")){
      str = str.replace("▌"," ( ");
      str = str.replace("▐"," ) ");
      str = str.replace("▄"," , ");
      str = str.replace("▀"," - ");
   }
   //remove double spaces
   while(str.includes("  ")){
      str = str.replace("  "," ");
   }
   return str;
}

function checkCombined(str1, str2) {
   if (str1.length == 0) {
      return false;
   }
   //var split = str1.split(str1.indexOf(str1.match(/[a-z]/)));
   var split1 = str1.slice(0,str1.indexOf(str1.match(/[\-a-z]/)));
   var split2 = str1.slice(str1.indexOf(str1.match(/[\-a-z]/)));
   var num = getNumber(split1);
   if (num == false) {
      return false;
   }
   measurement = isMeasurement(split2, str2);
   if (measurement == -1) {
      var ret = checkCombined(split2.slice(1), "");
      if (ret != false || ret.length == 3) {
         if (!Number.isNaN(ret[0])) {
            num = num * getNumber(ret[0]);
         }
         measurement = ret[1];
      }
      else if (num == false && measurement == -1) {
         return false;
      } else {
         return [num,measurement,ret[1]];
      }
   }
   return [num,measurement];
}
module.exports = {
   parse: function(string) {
      return parseIngredient(string);
   }
};
