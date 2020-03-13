var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
const kroger = require('./krogerUtils.js');
const con = require('./sqlConfig.js');

var client_id = config.kroger.client_id;
var client_secret = config.kroger.client_secret;

con.start(config.database);
kroger.getToken(client_id,client_secret, function(auth) {
   token = auth.access_token;
   parse();
});
async function parse() {
   var lastTime = 0;
   var token = "";
   var tokenValidity = 1800;

   const [result] = await con.asyncQuery(`SELECT name FROM ingredient LIMIT 25`);
   var res = result;
   console.log(res);
   for (var i = 0; i < res.length; i++) {
      var searchTerm = res[i].name;
      if (Date.now() > lastTime + tokenValidity - 100) {
         kroger.getToken(client_id,client_secret, function(auth) {
            lastTime = Date.now();
            token = auth.access_token;
            console.log(token);
            kroger.listProducts(token, {term:searchTerm,limit:1}, function(body) {
               console.log(body);
            });
         });
      } else {
         kroger.listProducts(token, {term:searchTerm,limit:1}, function(body) {
            console.log(body);
         });
      }
   }
}
