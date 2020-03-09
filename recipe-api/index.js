const axios = require("axios");
const express = require("express");
const math = require("mathjs");
const mysql = require("mysql");
const pino = require("express-pino-logger")();

const port = process.env.PORT || 3000;
const ingredient_base_url =
  process.env.INGREDIENTS_BASE_URL || "localhost:5000";

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

const handleFraction = number => {
  if (number.match(/\d+\/d+/)) {
    return math.number(math.fraction(number));
  } else {
    return math.number(number.match(/\d+/)[0]);
  }
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
    INSERT INTO instruction (recipe_id, step, text)
    VALUES
      ${directions.map(() => "(?, ?, ?)").join(", ")}
  `;

  const params = [].concat.apply(
    [],
    directions.map((direction, index) => [recipeId, index + 1, direction])
  );
  await execute(insertDirections, params);
};

const createOrInsertMeasurement = async measurement => {
  const selectMeasurement = `SELECT measurement_id FROM measurement WHERE unit = ?`;
  const selectAbbreviation = `SELECT measurement_id FROM abbreviation WHERE abbreviation = ?`;
  let [[measurementResults], [abbreviationResults]] = await Promise.all([
    execute(selectMeasurement, [measurement]),
    execute(selectAbbreviation, [measurement])
  ]);
  if (measurementResults.length == 0 && abbreviationResults.length == 0) {
    const insertMeasurement = `INSERT INTO measurement (unit, category, base_size) VALUES (?, ?, ?)`;
    const results = await execute(insertMeasurement, [measurement, null, 0]);
    return results.insertId;
  } else if (measurementResults.length == 1) {
    return measurementResults[0].measurement_id;
  } else if (abbreviationResults.length == 1) {
    return abbreviationResults[0].measurement_id;
  }
};

/**
 * @param {object} ingredient the return from the ingredients API
 * @param {number} recipeId the id of the recipe to attach the ingredient to
 */
const createOrInsertIngredient = async (ingredient, recipeId, index) => {
  let id;
  let measurementId = 1;

  let name = "name" in ingredient ? ingredient.name : "unknown";

  const selectIngredient = `SELECT ingredient_id FROM ingredient WHERE name = ?`;
  const [results] = await execute(selectIngredient, [name]);

  if (results.length == 0) {
    const insertIngredient = `INSERT INTO ingredient (name) VALUES (?)`;
    const result = await execute(insertIngredient, [name]);
    id = result.insertId;
  } else {
    id = results[0].ingredient_id;
  }

  if ("unit" in ingredient) {
    measurementId = await createOrInsertMeasurement(ingredient["unit"]);
  }

  const insertIngredientRow = `INSERT INTO ingredient_row (recipe_id, size, measurement_id, ingredient_id, list_order) VALUES (?, ?, ?, ?, ?)`;
  const binds = [
    recipeId,
    "qty" in ingredient ? handleFraction(ingredient.qty) : 0,
    measurementId,
    id,
    index
  ];
  await execute(insertIngredientRow, binds);
};

const insertIngredients = async (ingredients, recipeId) => {
  const cleanIngredients = ingredients.map(ingredient => {
    ingredient = ingredient.replace("¾", " 3/4");
    ingredient = ingredient.replace("½", " 1/2");
    ingredient = ingredient.replace("⅔", " 2/3");
    ingredient = ingredient.replace("¼", " 1/4");
    ingredient = ingredient.replace("⅓", " 1/3");
    return ingredient;
  });

  const ingredientReponse = await axios.post(
    `${ingredient_base_url}/ingredients`,
    { data: cleanIngredients },
    { headers: { "Content-Type": "application/json" } }
  );

  const ingredientArray = ingredientReponse.data.data;

  await Promise.all(
    ingredientArray.map((ingredient, index) =>
      createOrInsertIngredient(ingredient, recipeId, index)
    )
  );
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
  await Promise.all([
    insertDirections(recipe["directions"], insertId),
    insertIngredients(recipe["ingredients"], insertId)
  ]);
};

app.post("/recipes", async (req, res, next) => {
  let data = req.body.data;
  req.log.info(data);
  try {
    const results = await Promise.allSettled(
      data.map(recipe => submitRecipe(recipe))
    );
    console.log(results);
    const errors = results
      .map((result, index) =>
        result.status == "rejected" ? data[index] : null
      )
      .filter(result => result.status == null);
    res.send({ errorRecipes: errors });
  } catch (e) {
    req.log.error(e);
    next(e);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
