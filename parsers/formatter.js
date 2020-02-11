function boxFormat(str) {
   var strs = str.split("\n");
   var longestLength = 0;
   for (i = 0; i < strs.length; i++) {
      if (strs[i].split(": ")[1].length > longestLength) {
         longestLength = strs[i].split(": ")[1].length;
      }
   }
   var longestLabel = 0;
   for (i = 0; i < strs.length; i++) {
      if (strs[i].split(": ")[0].length > longestLabel) {
         longestLabel = strs[i].split(": ")[0].length+2;
      }
   }
   longestLength = longestLabel+longestLength;
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

module.exports = {
   box: function(string) {
      return boxFormat(string);
   }
};
