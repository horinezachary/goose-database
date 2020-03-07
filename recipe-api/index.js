const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT || 3000;

const app = express();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DBHOST || "localhost",
  user: process.env.DBUSER || "root",
  password: process.env.DBPWD || "password",
  database: process.env.DBNAME || "recipes",
  port: process.env.DBPORT || 3306
});

app.use(express.json());

const execute = async (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve([result, fields]);
    });
  });
};

const submitRecipe = async recipe => {
  const insertRecipe =
    "INSERT INTO recipe (source, url, title, author, cook_time, prep_time) VALUES (?, ?, ?, ?, ?, ?)";

  let params = [
    "source" in recipe ? recipe["source"] : "",
    recipe["url"],
    recipe["title"],
    recipe["author"],
    0,
    0
  ];
  let(results, fields) = await execute(insertRecipe, params);
};

app.post("/recipes", (req, res) => {
  console.log(req.body);
  data = req.body.data;
  res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
