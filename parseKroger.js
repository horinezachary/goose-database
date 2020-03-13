var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
const kroger = require('./krogerUtils.js');
const con = require('./sqlConfig.js');

var client_id = config.kroger.client_id;
var client_secret = config.kroger.client_secret;

con.start(config.database);
kroger.getToken(client_id,client_secret, function(auth) {
   var token = auth.access_token;
   console.log(token);
   var count = 2001;
   while(count <= 37100) {
      parse(token,count,100);
      count=count+100;
   }
});
async function parse(token, start, limit) {
   console.log(start);
   var total = 0;
   var lastTime = Date.now();
   var tokenValidity = 1800;
   const [result] = await con.asyncQuery(`SELECT * FROM ingredient WHERE ingredient_id >= ${start} AND ingredient_id <= ${start+limit}`);
   var res = result;
   console.log(res.length);
   for (var i = 0; i < res.length; i++) {
      var searchTerm = res[i].name;
      if (Date.now() > lastTime + tokenValidity - 100) {
         kroger.getToken(client_id,client_secret, async function(auth) {
            lastTime = Date.now();
            token = auth.access_token;
            console.log("token!");
            kroger.listProducts(token, {term:searchTerm,limit:1}, async function(item,body) {
               var b = body.data[0];
               if (b != undefined) {
                  console.log(b.productId);
                  var image = "https://www.kroger.com/product/images/large/front/"+b.url;
                  var size = b.items[0].size;
                  await con.asyncQuery(`INSERT IGNORE INTO krogerFood VALUES(?,?,?,?,?,?,?,?,?)`,[b.productId,item,b.brand,b.countryOrigin,b.description,image,size,b.temperature.indicator,b.temperature.heatSensitive]);
                  total++;
                  console.log(total+"/"+res.length);
               } else {
                  console.log(undefined);
                  total++;
                  console.log(total+"/"+res.length);
               }
            });
         });
      } else {
         kroger.listProducts(token, {term:searchTerm,limit:1}, async function(item,body) {
            var b = body.data[0];
            if (b != undefined) {
               console.log(b.productId);
               var image = "https://www.kroger.com/product/images/large/front/"+b.url;
               var size = b.items[0].size;
               await con.asyncQuery(`INSERT IGNORE INTO krogerFood VALUES(?,?,?,?,?,?,?,?,?)`,[b.productId,item,b.brand,b.countryOrigin,b.description,image,size,b.temperature.indicator,b.temperature.heatSensitive]);
               total++;
               console.log(total+"/"+res.length);
            } else {
               console.log(undefined);
               total++;
               console.log(total+"/"+res.length);
            }
         });
      }
   }
}
