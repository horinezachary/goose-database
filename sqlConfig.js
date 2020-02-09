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

module.exports = {
   start: function(cfg) {
      return start(cfg);
   },
   query: function(sql,callback) {
      return query(sql,callback);
   }
}
