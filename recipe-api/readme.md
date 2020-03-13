# Recipe API

Requirements:
* node.js >=13
* MySQL server

Installing dependencies:
* `npm install`

Running:
* copy `.env.example` to `.env` and change environment variables as necessary. The example file is configured for use with a local mysql database.
* `npm run start`

## Docker

Build using `docker build .`. 

Can also pull from Google Container Registry with `docker pull gcr.io/goosedb/recipe-api:latest`.

To run, set the same environment variables used in `.env.example` using the `-e` flag.
