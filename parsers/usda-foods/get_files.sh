#!/bin/sh

curl -L https://storage.googleapis.com/goosedb-data/ingest/usda-foods/food.csv > food.csv
curl -L https://storage.googleapis.com/goosedb-data/ingest/usda-foods/good_foods.json > good_foods.json
curl -L https://storage.googleapis.com/goosedb-data/ingest/usda-foods/nutrient.csv > supporting/nutrient.csv

