# Goose Database

This repository is for the development of the goose database system. While goose may be an acronym, nobody is exactly sure what it stands for. Frontend code and scraping scripts will live here, at least until they become the most awesome recipe database ever.

### Database setup
Import the `recipes_schema.sql` file into your mySQL server. This can be done by using the following command:
```bash
mysql -u user -p recipes < recipes.sql  
```

### To run the frontend
1. install node
2. run `npm install` to download all of the node modules
3. create a `config.js` file with your connection information (instructions found below)
3. run the code with `npm start`

### Running scrapers
Each data collection scraper comes with three files. 
1. A parser that collects all the recipe urls so they may be directly fed into the other program
2. A scheduler that just runs them in sequence so that they may be ran for a long period of time
3. A scraper, that scrapes the recipe data from the url that was gathered by the parser

There are a few dependencies that these require:
```python
pip3 install requests
pip3 install beautifulsoup4
pip3 install recipe-scrapers
pip3 install selenium #also need the selenium chromedriver for this to work
```
Each run collects the urls into recipes.txt. Then the scraper collects them 100 at a time into each threaded file. Once they are done they can then be imported through the api for parsing and insertion into the database.
### Creating a config file
When developing, you will need to insert your credentials in a file named config.js. There is an example file to follow for format (exampleconfig.js). It should include the following, where user and pass are your username and password:
```js
host: "pma.horine.dev",
user: "user",
password: "pass",
database: "recipes"
```
You can have multuple configurations in this file, and the application decides which one to use by looking at the `NODE_ENV` environment variable. If you haven't set this though, it defaults to `development`.

## Recipe API Server

See recipe-api/readme.md for details.

## Ingredient Phrase Tagger API Server

See https://github.com/jemisonf/ingredient-phrase-tagger for details.
