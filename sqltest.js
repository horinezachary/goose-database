var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var con = require('./sqlConfig');

test();

async function test() {
   con.start(config.database);
   const [results] = await con.asyncQuery(`Select * FROM measurement`);
   console.log(results);
   con.query(`SELECT * FROM measurement`, function (err, measurement) {
      console.log(measurement);
   });
   return;
}
