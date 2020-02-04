const weight = ["pound","ounce"];
const weightAbbr = ["lb", "oz"];
const volume = ["gallon", "quart", "pint", "cup", "fluid ounce", "tablespoon", "teaspoon", "milliliter", "liter"];
const volumeAbbr = ["gal","qt","pt","cp","floz","tbsp","tsp","ml","l"];
const length = ["inch","centimeter"];
const lengthAbbr = ["in", "cm"];
const other = ["piece"];
const otherAbbr = ["pc"];
const defaultmeasurement = "unit";

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
      } else {ret = false;}
      if (ret != false) {
         num = num * ret[0];
         measurement = ret[1];
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
   var origarr = origsString.split(" ");
   for (i = consumed; i < arr.length; i++) {
      //TODO: check for ignored words
      ingredient += " " + origarr[i];
   }
   return {num,measurement,ingredient};
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
   var sp = getVulgarFraction(str)
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

function isMeasurement(str1, str2) {
   if (str1.match(/^(fluid)$|^(fl)[.]?$/)) {
      if (str2.match(/^(ounce)[s]?$|^(oz)[.]?$/)) {
         //fluid oz
         return volume[4];
      } else return -1;
   }
   for (i = 0; i < volume.length; i++) {
      if (str1.match('^('+volume[i]+')[s]?$|^('+volumeAbbr[i]+')[s]?[.]?$')) {
         //is volume
         return volume[i];
      }
   }
   for (i = 0; i < weight.length; i++) {
      if (str1.match('^('+weight[i]+')[s]?$|^('+weightAbbr[i]+')[s]?[.]?$')) {
         //is weight
         return weight[i];
      }
   }
   for (i = 0; i < length.length; i++) {
      if (str1.match('^('+length[i]+')[e]?[s]?$|^('+lengthAbbr[i]+')[s]?[.]?$')) {
         //is length
         return length[i];
      }
   }
   for (i = 0; i < other.length; i++) {
      if (str1.match('^('+other[i]+')[e]?[s]?$|^('+otherAbbr[i]+')[s]?[.]?$')) {
         //is other
         return other[i];
      }
   }
   return -1;
}

function removeParenthesis(str) {
   var innerbits = {};
   while (str.match(/\([^\(\)]*\)/) !== null) {
      var reg = str.match(/\([^\(\)]*\)/);
      for (i = 0; i < reg.length; i++) {
         innerbits+=(reg[i]);
         str = str.replace(reg[i],reg[i].substring(1,reg[i].length-1));
      }
   }
   //return {str,innerbits};
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
      if (ret != false) {
         if (!Number.isNaN(ret[0])) {
            num = num * getNumber(ret[0]);
         }
         measurement = ret[1];
      }
      else {
         return false;
      }
   }
   return [num,measurement];
}
module.exports = {
   parse: function(string) {
      return parseIngredient(string);
   }
};
