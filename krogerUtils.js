const request = require('request');

function getToken(client_id, client_secret, callback) {
   let key = new Buffer(client_id+":"+client_secret).toString('base64');
   request.post({
      url: 'https://api.kroger.com/v1/connect/oauth2/token',
      headers: {
         'Content-Type': "application/x-www-form-urlencoded",
         Authorization: "Basic "+key
      },
      form: {
         grant_type: "client_credentials",
         scope: "product.compact"
      }
   }, function (err, httpResponse, body) {
      if (body.startsWith('<')) {
         callback({data:[]});
      }else if (callback) {
         callback(JSON.parse(body));
      }
   });
}

function parseOptions(options) {
   var query = "";
   if (options.term       != null) {query+="filter.term="      +options.term+"&"}
   if (options.locationId != null) {query+="filter.locationId="+options.locationId+"&"}
   if (options.productId  != null) {query+="filter.productId=" +options.productId+"&"}
   if (options.brand      != null) {query+="filter.brand="     +options.brand+"&"}
   if (options.fufillment != null) {query+="filter.fufillment="+options.fufillment+"&"}
   if (options.start      != null) {query+="filter.start="     +options.start+"&"}
   if (options.limit      != null) {query+="filter.limit="     +options.limit+"&"}
   if(query.endsWith("&")) {query = query.substr(0,query.length-1);}
   return query;
}

//options is js object with the following fields:
//term, locationId, productId, brand, fufillment, start, limit
function listProducts(bearerToken, options, callback) {
   var domain = "products"
   var params = parseOptions(options);
   getQuery(bearerToken, domain, options.term, params, callback);
}


function getQuery(bearerToken, domain, item, query, callback){
      request.get({
      url: "https://api.kroger.com/v1/"+domain+"?"+query,
      headers: {
         "Accept": "application/json",
         "Authorization": "Bearer "+bearerToken
      }
   }, function (err, httpResponse, body) {
      if (body) {
         if (body.startsWith('<')) {
            callback({data:[]});
         }else if (callback) {
            //console.log(query);
            //console.log(body);
            callback(item,JSON.parse(body));
         }
      }
   });
}

function test() {
   getToken(client_id,client_secret,function(body) {
      console.log(body.access_token);
   });
}

module.exports = {
   getToken: function(client_id,client_secret, callback) {
      return getToken(client_id,client_secret,callback);
   },
   listProducts: function(token, options, callback) {
      return listProducts(token, options, callback);
   }
}
