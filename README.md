# Goose Database

This repository is for the development of the goose database system. While goose may be an acronym, nobody is exactly sure what it stands for. Frontend code and scraping scripts will live here, at least until they become the most awesome recipe database ever.

### Database setup
Import the `recipes.sql` file into your mySQL server. This can be done by using the following command:
```bash
mysql -u user -p recipes < recipes.sql  
```

### To run the frontend
1. install node
2. run `npm install` to download all of the node modules
3. create a `config.js` file with your connection information (instructions found below)
3. run the code with `npm start`


### Creating a config file
When developing, you will need to insert your credentials in a file named config.js. There is an example file to follow for format (exampleconfig.js). It should include the following, where user and pass are your username and password:
```js
host: "pma.horine.dev",
user: "user",
password: "pass",
database: "recipes"
```
You can have multuple configurations in this file, and the application decides which one to use by looking at the `NODE_ENV` environment variable. If you haven't set this though, it defaults to `development`.
