var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
const kroger = require('./krogerUtils.js');
const con = require('./sqlConfig.js');

var client_id = config.kroger.client_id;
var client_secret = config.kroger.client_secret;

con.start(config.database);
kroger.getToken(client_id,client_secret, function(auth) {
   var token = auth.access_token;
   parse(token);
});
async function parse(token) {
   var lastTime = Date.now();
   var tokenValidity = 1800;

   const [result] = await con.asyncQuery(`SELECT name FROM ingredient`);
   var res = result;
   console.log(res);
   for (var i = 0; i < res.length; i++) {
      var searchTerm = res[i].name;
      if (Date.now() > lastTime + tokenValidity - 100) {
         kroger.getToken(client_id,client_secret, async function(auth) {
            lastTime = Date.now();
            token = auth.access_token;
            console.log(token);
            kroger.listProducts(token, {term:searchTerm,limit:1}, async function(body) {
               var b = body.data[0];
               var image = b.images[0].sizes[2].url;
               var size = b.items.size;
               await con.asyncQuery(`INSERT IGNORE INTO krogerFood VALUES('${b.productId}','${b.brand}','${b.countryOrigin}','${b.description}','${image}','${size}','${b.temperature.indicator}',${b.temperature.heatSensitive})`);
            });
         });
      } else {
         kroger.listProducts(token, {term:searchTerm,limit:1}, async function(body) {
            var b = body.data[0];
            var image = b.images[0].sizes[2].url;
            var size = b.items[0].size;
            await con.asyncQuery(`INSERT IGNORE INTO krogerFood VALUES('${b.productId}','${b.brand}','${b.countryOrigin}','${b.description}','${image}','${size}','${b.temperature.indicator}',${b.temperature.heatSensitive})`);
         });
      }
   }
}
