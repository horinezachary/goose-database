var mysql = require('mysql');
var pool;

function start(cfg) {
   pool = mysql.createPool(cfg);
}

function query(sql,callback) {
   pool.getConnection(function(err, connection) {
      if(err) {
         console.log(err);
         if (callback) {
            callback(true);
         }
         return;
      }
      connection.query(sql, function(err, results) {
         connection.release(); // always put connection back in pool after last query
         if(err) {
            console.log(err);
            if (callback) {
               callback(true);
            }
            return;
         }
         if (callback) {
            callback(false, results);
         }
      });
   });
}
//called with: const [results] = await asyncQuery(query, [sourceName, 0]);
function asyncQuery(query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve([results, fields]);
    });
  });
}

module.exports = {
   start: function(cfg) {
      return start(cfg);
   },
   query: function(sql,callback) {
      return query(sql,callback);
   },
   asyncQuery: function(query, values) {
      return asyncQuery(query, values);
   }
}