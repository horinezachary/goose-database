var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
const kroger = require('./krogerUtils.js');
const con = require('./sqlConfig.js');

var client_id = config.kroger.client_id;
var client_secret = config.kroger.client_secret;

con.start(config.database);

runParse(30001,40000);
async function runParse(start,end) {
   kroger.getToken(client_id,client_secret, function(auth) {
      var token = auth.access_token;
      console.log(token);
      var low = start;
      var high = end;
   //   var count = 7001;
   //   while(count <= 12000) {
         parse(token,low,high-low);
   //      count=count+100;
   //   }
   });
}
//getPrices()
async function getPrices(){
   const [result] = await con.asyncQuery(`SELECT * FROM krogerFood WHERE price = '0' LIMIT 200`);
   kroger.getToken(client_id,client_secret, async function(auth) {
      var res = result;
      //console.log(auth.access_token);
      console.log(res.length);
      //for (var i = 0; i < res/200; i++) {
         //console.log(i);
         console.log(res);
         var sub = [];
         //var sub = res.slice(i*200,i*200+200);
         for (var k = 0; k < res.length; k++) {
            sub.push(res[k].productId);
         }
         console.log(sub);
         kroger.getProducts(auth.access_token,sub,{locationId:"70100070"}, async function(item,body){
            for (var j = 0; j < body.data.length; j++) {
               if (body.data[j].items[0].price != undefined){
                  console.log(body.data[j].items[0])
                  var price = body.data[j].items[0].price.regular;
                  console.log(price);
                  await con.asyncQuery(`UPDATE krogerFood SET price= ? WHERE productId = ?`,[price,sub[j]]);
                  console.log(j);
               }
            }
         });
      //}
   });
}

async function parse(token, start, limit) {
   console.log(start);
   var total = 0;
   var lastTime = Date.now();
   var tokenValidity = 1800;
   const [result] = await con.asyncQuery(`SELECT name FROM ingredient WHERE ingredient.name NOT IN (SELECT name FROM krogerFood) AND ingredient.name NOT IN (SELECT name FROM krogerUndef) AND ingredient_id >= ${start} AND ingredient_id <= ${start+limit}`);
   var res = result;
   //console.log(res.length);
   for (var i = 0; i < res.length; i++) {
      var searchTerm = res[i].name;
      if (Date.now() > lastTime + tokenValidity - 100) {
         kroger.getToken(client_id,client_secret, async function(auth) {
            lastTime = Date.now();
            token = auth.access_token;
            console.log("token!");
            kroger.listProducts(token, {term:searchTerm,locationId:"70100070",limit:1}, async function(item,body) {
               if (body != undefined) {
                  var b = body.data[0];
                  if (b != undefined) {
                     console.log(b.productId);
                     var image = "https://www.kroger.com/product/images/large/front/"+b.url;
                     var size = b.items[0].size;
                     var price = b.items[0].price.regular;
                     await con.asyncQuery(`INSERT IGNORE INTO krogerFood VALUES(?,?,?,?,?,?,?,?,?,?)`,[b.productId,item,b.brand,b.countryOrigin,b.description,image,price,size,b.temperature.indicator,b.temperature.heatSensitive]);
                     total++;
                     console.log(total+"/"+res.length);
                  } else {
                     console.log(undefined);
                     await con.asyncQuery(`INSERT IGNORE INTO krogerUndef VALUES(?)`,[item]);
                     total++;
                     console.log(total+"/"+res.length);
                  }
               }
            });
         });
      } else {
         kroger.listProducts(token, {term:searchTerm,locationId:"70100070",limit:1}, async function(item,body) {
            if (body != undefined) {
               var b = body.data[0];
               if (b != undefined) {
                  console.log(b.productId);
                  var image = "https://www.kroger.com/product/images/large/front/"+b.url;
                  var size = b.items[0].size;
                  console.log(b.items[0].price);
                  var price = ""
                  if (b.items[0].price != undefined){
                     price = b.items[0].price.regular;
                  }
                  await con.asyncQuery(`INSERT IGNORE INTO krogerFood VALUES(?,?,?,?,?,?,?,?,?,?)`,[b.productId,item,b.brand,b.countryOrigin,b.description,image,price,size,b.temperature.indicator,b.temperature.heatSensitive]);
                  total++;
                  console.log(total+"/"+res.length);
               } else {
                  console.log(undefined);
                  await con.asyncQuery(`INSERT IGNORE INTO krogerUndef VALUES(?)`,[item]);
                  total++;
                  console.log(total+"/"+res.length);
               }
            }
         });
      }
   }
}
