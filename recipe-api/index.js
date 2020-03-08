const express = require("express");
const mysql = require("mysql");
const pino = require("express-pino-logger")();
const port = process.env.PORT || 3000;

const app = express();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DBHOST || "localhost",
  user: process.env.DBUSER || "root",
  password: process.env.DBPWD || "password",
  database: process.env.DBNAME || "recipes",
  port: process.env.DBPORT || 3306,
  insecureAuth: true
});

app.use(express.json());
app.use(pino);

const execute = async (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve([results, fields]);
    });
  });
};

const makeOrFindSiteByName = async sourceName => {
  const selectSiteName = "SELECT site_id FROM site WHERE site_title = ?";
  let [results] = await execute(selectSiteName, [sourceName]);
  if (results.length == 0) {
    const insertSite = "INSERT INTO site (site_title, base_url) VALUES (?, ?)";
    const [results] = await execute(insertSite, [sourceName, 0]);
    const { insertId } = results;
    return insertId;
  }
  const { site_id } = results[0];
  return site_id;
};

const makeOrFindAuthorByName = async (authorName, siteId) => {
  const selectAuthor =
    "SELECT author_id FROM author WHERE author_name = ? AND site_id = ?";
  let [results] = await execute(selectAuthor, [authorName, siteId]);
  if (results.length == 0) {
    const insertAuthor =
      "INSERT INTO author (author_name, site_id) VALUES (?, ?)";
    const [results] = await execute(insertAuthor, [authorName, siteId]);
    const { insertId } = results;
    return insertId;
  }
  const { author_id } = results[0];
  return author_id;
};

const insertDirections = async (directions, recipeId) => {
  const insertDirections = `
    INSERT INTO instruction (recipe, step, text)
    VALUES
      ${directions.map(() => "(?, ?, ?)").join(", ")}
  `;

  const params = [].concat.apply(
    [],
    directions.map((direction, index) => [recipeId, index + 1, direction])
  );
  await execute(insertDirections, params);
};

const submitRecipe = async recipe => {
  const insertRecipe =
    "INSERT INTO recipe (site_id, author_id, url, title, cook_time, prep_time) VALUES (?, ?, ?, ?, ?, ?)";

  if (
    !("source" in recipe) ||
    !("author" in recipe) ||
    !("url" in recipe) ||
    !("title" in recipe) ||
    !("cook_time" in recipe) ||
    !("prep_time" in recipe) ||
    !("directions" in recipe)
  ) {
    throw new Error("missing elements of recipe body");
  }

  let siteId = await makeOrFindSiteByName(recipe["source"]);
  let authorId = await makeOrFindAuthorByName(recipe["author"], siteId);
  let params = [
    siteId,
    authorId,
    recipe["url"],
    recipe["title"],
    recipe["cook_time"] == "none" ? 0 : recipe["cook_time"],
    recipe["prep_time"] == "none" ? 0 : recipe["prep_time"]
  ];
  const [results] = await execute(insertRecipe, params);
  const { insertId } = results;
  await insertDirections(recipe["directions"], insertId);
};

app.post("/recipes", async (req, res, next) => {
  let data = req.body.data;
  req.log.info(data);
  try {
    await Promise.all(data.map(recipe => submitRecipe(recipe)));
    res.status(204).send("");
  } catch (e) {
    req.log.error(e);
    next(e);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
