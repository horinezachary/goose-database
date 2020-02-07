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

const NUM         = "N";
const MEASUREMENT = "M";
const INGREDIENT  = "I";
const VERB        = "V";
const ADVERB      = "A";
const CONNECTOR   = "J";
const GARBAGE     = "G";
const COMBINED    = "C";
const UNKNOWN     = "U";

const START_PAREN = "PS";
const END_PAREN   = "PE";
const COMMA       = "PC";
const DASH        = "PD";

console.log(parseIngredient("450ml (about 2 cups) good-quality fish stock"));

function parseIngredient(string) {
   var num = 1;
   var measurement;
   var ingredient = "";
   var text = ""

   var wordArray = [];
   var string = spacePunctuation(string);
   var arr = string.split(' ');

   for (var i = 0; i < arr.length; i++) {
      wordArray.push(parseWord(arr[i]));
   }
   console.log(string);
   return wordArray;
   //return {"size":num,"measurement":measurement,"ingredient":ingredient,"text":text};
}

function parseWord(str) {
   if (getNumber(str) != false) {
      return NUM;
   }
   if (isMeasurement(str) != -1) {
      return MEASUREMENT;
   }
   if (isIngredient(str) != false) {
      return INGREDIENT;
   }
   if (isVerb(str) != false) {
      return VERB;
   }
   if (isAdverb(str) != false) {
      return ADVERB;
   }
   if (isConnectorWord(str) != false) {
      return CONNECTOR;
   }
   if (isGarbage(str) != false) {
      return GARBAGE;
   }
   if (str == "(") {
      return START_PAREN;
   }
   if (str == ")") {
      return END_PAREN;
   }
   if (str == ",") {
      return COMMA;
   }
   return UNKNOWN;

}

function isNumber(str) {
   if (str.match(/^[0-9.\/]*$/g) != null) {
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

function isMeasurement(str) {
   //TODO: Simplify this
   str = str.toLowerCase();
   if (str.match(/^(fluid)$|^(fl)[.]?$/)) {
      return volume[4];
   }
   if (str.match(/^(ounce)[s]?$|^(oz)[.]?$/)) {
      return volume[4];
   }
   for (var i = 0; i < volume.length; i++) {
      if (str.match('^('+volume[i]+')[s]?$|^('+volumeAbbr[i]+')[s]?[.]?$')) {
         //is volume
         return volume[i];
      }
   }
   for (var i = 0; i < weight.length; i++) {
      if (str.match('^('+weight[i]+')[s]?$|^('+weightAbbr[i]+')[s]?[.]?$')) {
         //is weight
         return weight[i];
      }
   }
   for (var i = 0; i < length.length; i++) {
      if (str.match('^('+length[i]+')[e]?[s]?$|^('+lengthAbbr[i]+')[s]?[.]?$')) {
         //is length
         return length[i];
      }
   }
   for (var i = 0; i < other.length; i++) {
      if (str.match('^('+other[i]+')[e]?[s]?$|^('+otherAbbr[i]+')[s]?[.]?$')) {
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
   return str.trim();
}

function checkCombined(str) {
   if (str.length == 0) {
      return false;
   }
   //var split = str.split(str.indexOf(str.match(/[a-z]/)));
   var split1 = str.slice(0,str.indexOf(str.match(/[A-Za-z]/)));
   var split2 = str.slice(str.indexOf(str.match(/[A-Za-z]/)));
   var s1 = parseWord(split1);
   var s2 = parseWord(split2);
   if (s1 != UNKNOWN) {
      if (s2 != UNKNOWN) {
         return [split1,split2];
      } else {
         var ret = checkCombined(split2.slice(1));
         if (ret != false) {
            return [split1,ret];
         }
      }
   } else {
      return false;
   }
}

module.exports = {
   parse: function(string) {
      return parseIngredient(string);
   }
};
