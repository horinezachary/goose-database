const fs = require('fs');
const format = require('./formatter.js');

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

const numbers = require('./numbers.json');
const words = require('./words.js');
const foods = require('./foods.json');
const manualAddFoods = require('./manualAddFoods.json');

var verbs = words.verbs;
var adverbs = words.adverbs;
var adjectives = words.adjectives;
var connectors = words.connectors;
var ignored = words.ignored;

const NUM         = "N";
const NUM_RANGE   = "R";
const NUM_WORD    = "W";
const MEASUREMENT = "M";
const INGREDIENT  = "I";
const VERB        = "V";
const ADVERB      = "A";
const ADJECTIVE   = "D";
const CONNECTOR   = "J";
const GARBAGE     = "G";
const COMBINED    = "C";
const UNKNOWN     = "U";

const START_PAREN = "PS";
const END_PAREN   = "PE";
const COMMA       = "PC";
const DASH        = "PD";
const SEMI_COLON  = "SC";

function parseIngredient(string) {
//function parseIngredient(string,callback) {
   var num = "";
   var variance = 0;
   var measurement;
   var ingredient = "";
   var text = "";

   var wordArray = [];
   var string = spacePunctuation(string);
   var arr = string.split(' ');

   for (var i = 0; i < arr.length; i++) {
      var c = parseWord(arr[i]);
      //check for combined words
      if (c == UNKNOWN) {
         var ret = checkCombined(arr[i]);
         if (ret != false) {
            arr.splice(i,1);
            for (var j = 0; j < ret.length; j++) {
               arr.splice(i+j,0,ret[j]);
               wordArray.push(parseWord(ret[j]));
            }
            i+=ret.length-1;
         } else {
            //check returned false, no real words
            wordArray.push(c);
         }
      } else {
         //already defined
         wordArray.push(c);
      }
   }
   for (var i = 0; i < arr.length; i++) {
      if(wordArray[i] == NUM_WORD) {
         arr.splice(i,1,getSpelledNum(arr[i]));
         wordArray.splice(i,1,NUM_WORD)
         if (i < arr.length-1){
            if(wordArray[i+1] == NUM_WORD) {
               arr.splice(i,2,parseFloat(arr[i])*parseFloat(getSpelledNum(arr[i+1])));
               wordArray.splice(i,1);
            }
         }
      }
      if (i < arr.length-1){
         if (wordArray[i] == NUM && wordArray[i+1] == NUM) {
            arr.splice(i,2,parseFloat(arr[i])+parseFloat(arr[i+1]));
            wordArray.splice(i,1);
         }
         if(wordArray[i] == NUM && wordArray[i+1] == NUM_WORD) {
            arr.splice(i,2,parseFloat(arr[i])+parseFloat(getSpelledNum(arr[i+1])));
            wordArray.splice(i,1);
         }
      }
   }
   for (var i = 0; i < arr.length; i++) {
      if (i > 0 && i < arr.length-1){
         //at least one value on either side
         if (wordArray[i] == DASH) {
            //hyphenated number words
            if(wordArray[i-1] == NUM_WORD && wordArray[i+1] == NUM_WORD) {
               var total = arr[i-1]+arr[i+1];
               arr.splice(i-1,3,total);
               wordArray.splice(i-1,3,NUM_WORD);
            }
            //hyphenated word
            if(isWord(arr[i-1]) && isWord(arr[i+1])) {
               if ((wordArray[i-1] == ADJECTIVE || wordArray[i-1] == UNKNOWN) && wordArray[i+1] == UNKNOWN) {
                  arr.splice(i-1,3,arr[i-1]+"-"+arr[i+1]);
                  wordArray.splice(i,2);
               }
            }
            //range of values
            if (wordArray[i-1] == NUM && wordArray[i+1] == NUM) {
               arr.splice(i-1,3,arr[i-1]+"-"+arr[i+1]);
               wordArray.splice(i-1,3,NUM_RANGE);
            }
         }
      }
   }
   var openParen = [];
   for (var i = 0; i < arr.length; i++) {
      if(wordArray[i] == START_PAREN) {
         openParen.push(i)
      }
      if (wordArray[i] == END_PAREN) {
         var open = openParen.shift();
         var run = "";
         for(var j = open; j < i; j++) {
            run+=wordArray[j];
         }
         if (run.includes('GNM') || run.includes('GRM')) {
            //about x amt, most likely an equivalency.
            if (wordArray.join().match("N,M") != null || wordArray.join().match("R,M") != null) {
               //there are more than one num/measurement values,
               //it is pretty safe to remove this one.
               var idx;
               if (run.includes('GNM')) {
                  idx = run.indexOf("GNM")+1;
               } else {
                  idx = run.indexOf("GRM")+1;
               }
               arr.splice(idx,3);
               wordArray.splice(idx,3);
            }
         }
      }
   }
   for (var i = 0; i < arr.length; i++) {
      if (i < arr.length-1){
         if (wordArray[i] == START_PAREN && wordArray[i+1] == END_PAREN) {
            arr.splice(i,2);
            wordArray.splice(i,2);
         }
      }
   }
   var unknownStrings = [];
   for (var i = 0; i < arr.length; i++) {
      if (wordArray[i] == UNKNOWN) {
         var string = arr[i];
         var start = i;
         var end = i;
         i++;
         while (wordArray[i] == UNKNOWN && i < arr.length) {
            string+=" "+arr[i];
            end = i;
            i++;
         }
         unknownStrings.push({string,start,end});
      }
   }
   //console.log(unknownStrings);

   //check against foods list
   var ret = checkFoods(unknownStrings,arr,wordArray);
   arr = ret[0];
   wordArray = ret[1];
   var unknownWords = ret[2];


   for (var i = 0; i < arr.length; i++) {
      if (wordArray[i] == NUM) {
         num = getNumber(arr[i]);
      }
      if (wordArray[i] == NUM_RANGE) {
         var range = arr[i].split('-');
         num = Math.min(range[0],range[1]) + Math.abs(range[0] - range[1])/2; //median
         variance = Math.abs(range[0] - num);
      }
      if (wordArray[i] == MEASUREMENT) {
         measurement=arr[i];
      }
      if (wordArray[i] == INGREDIENT) {
         ingredient+=" "+arr[i];
      }
      if (wordArray[i] == VERB || wordArray[i] == ADVERB || wordArray[i] == ADJECTIVE) {
         text+=" "+arr[i];
      }
   }

   if (num == "") {
      num = 1;
   }
   text = text.trim();
   ingredient = ingredient.trim();
   //console.log(JSON.stringify(arr));
   //console.log(wordArray);
   //return wordArray;
   return [{"size":num,"measurement":measurement,"variance":variance,"ingredient":ingredient,"text":text},unknownWords];
}

function checkFoods(unknownStrings,arr,wordArray) {
   var unknownWords = [];
   for (var i = 0; i < unknownStrings.length; i++) {
      var strObj = unknownStrings[i];
      var food = checkSingleFood(unknownStrings[i]);
      if (food != false) {
         arr.splice(strObj.start,strObj.end-strObj.start+1,foods[j]);
         wordArray.splice(strObj.start,strObj.end-strObj.start+1,INGREDIENT);
      } else {
         //console.log(arr+"\n"+wordArray+"\n"+"UNKNOWN: "+Object.values(strObj));
         unknownWords.push(strObj.string);
      }
   }
   return [arr,wordArray,unknownWords];
}

function checkSingleFood(unknown) {
   for (j = 0; j < foods.length; j++) {
      if (foods[j] == unknown.string) {
         return foods[j];
      }
   }
   return false;
}

function parseWord(str) {
   if (getNumber(str) != false) {
      return NUM;
   }
   if (getSpelledNum(str) != false) {
      return NUM_WORD;
   }
   if (isMeasurement(str) != -1) {
      return MEASUREMENT;
   }
   if (isVerb(str) != false) {
      return VERB;
   }
   if (isAdverb(str) != false) {
      return ADVERB;
   }
   if (isAdjective(str) != false) {
      return ADJECTIVE;
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
   if (str == "-") {
      return DASH;
   }
   if (str == ";") {
      return SEMI_COLON;
   }
   return UNKNOWN;

}
//made up of all letters
function isWord(str) {
   if (str.toString().match(/^[a-zA-Z.-]*$/g) != null) {
      return true;
   }
   else {
      return false;
   }
}

//numbers or decimal
function isNumber(str) {
   if (str.toString().match(/^[0-9.\/]*$/g) != null) {
      return true;
   }
   else {
      return false;
   }
}

//returns float, takes in fraction, vulgar, int or float
function getNumber(str) {
   if (str == "") {
      return false;
   }
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

function getSpelledNum(str){
   for (var i = 0; i < Object.values(numbers).length; i++) {
      if (str == Object.keys(numbers)[i]) {
         return Object.values(numbers)[i];
      }
   }
   return false;
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
            if (vul == "/") {
               return runningTotal / parseFloat(getNumber(str.substring(i+1)))
            } else {
               runningTotal += vul;
               containsVul = true;
               runningTotal += runningNumber;
               runningNumber = 0;
            }
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
      case "⁄":
         return "/";
         break;
      default:
         return false;
         break;
   }
}

function isMeasurement(str) {
   //TODO: Simplify this
   str = str.toString().toLowerCase();
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

function isVerb(str) {
   for (var i = 0; i < verbs.length; i++) {
      if (str == verbs[i]) {
         return verbs[i];
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

function isAdjective(str) {
   for (var i = 0; i < adjectives.length; i++) {
      if (str == adjectives[i]) {
         return adjectives[i];
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
   while(str.includes("(")||str.includes(")")||str.includes(",")||str.includes("-")||str.includes("–")||str.includes(";")){
      str = str.replace("(","▌");
      str = str.replace(")","▐");
      str = str.replace(",","▄");
      str = str.replace("-","▀");
      str = str.replace("–","▀");
      str = str.replace(";","█");

   }
   //convert back with spaces
   while(str.includes("▌")||str.includes("▐")||str.includes("▄")||str.includes("▀")||str.includes("█")){
      str = str.replace("▌"," ( ");
      str = str.replace("▐"," ) ");
      str = str.replace("▄"," , ");
      str = str.replace("▀"," - ");
      str = str.replace("█"," ; ");
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
         return format.reduce([split1,split2]);
      } else {
         var ret = checkCombined(split2.slice(1));
         if (ret != false) {
            return format.reduce([split1,ret]);
         } else {
            return split1;
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
