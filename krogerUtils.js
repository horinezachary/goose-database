const request = require('request');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

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
   if (options.chain      != null) {query+="filter.chain="     +options.chain+"&"}
   if (options.zipcode    != null) {query+="filter.zipCode.near="+options.zipcode+"&"}

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

function getProducts(bearerToken, productIdList, options, callback) {
   var query = "filter.productId=";
   for (var i = 0; i < productIdList.length; i++) {
      var id = "0".repeat(13-productIdList[i].length)+productIdList[i];
      query+=id+",";
   }
   params = parseOptions(options);
   if(query.endsWith(",")) {query = query.substr(0,query.length-1);}
   getQuery(bearerToken, "products", productIdList, query+"&"+params, callback);
}

function getLocation(bearerToken, options, callback) {
   var domain = "locations";
   var params = parseOptions(options);
   getQuery(bearerToken, domain,options.zipcode,params,callback);
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
            console.log(query);
            //console.log(body);
            callback(item,JSON.parse(body));
         }
      }
   });
}

function test() {
   getToken(config.kroger.client_id,config.kroger.client_secret,function(body) {
      console.log(body.access_token);
         getLocation(body.access_token,{chain:"FRED",zipcode:"97330",limit:1}, function(item,body) {
            console.log(body);
         });
         listProducts(body.access_token, {term:"milk",locationId:"70100070",limit:1}, function(item,body) {
            console.log(body);
            console.log(body.data[0].items[0]);
         });
         getProducts(body.access_token,["2502","2554","3029"],{locationId:"70100070"}, function(item,body) {
            console.log(body);
         })
   });

}

test();

module.exports = {
   getToken: function(client_id,client_secret, callback) {
      return getToken(client_id,client_secret,callback);
   },
   listProducts: function(token, options, callback) {
      return listProducts(token, options, callback);
   },
   getProducts: function(token, productIdList, options, callback) {
      return getProducts(token, productIdList, options, callback);
   }
}
