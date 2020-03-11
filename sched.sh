#!/bin/bash

echo "Setting up some stuff for scraping to work"
#pip3 install selenium
#pip3 install recipe-scrapers
#pip3 install beautifulsoup4


echo "Scraping recipe URLS into recipes.txt....."

python3 parse.py https://www.food.com/recipe?ref=nav
python3 parse.py https://www.food.com/recipe/all/trending
python3 parse.py https://www.food.com/recipe/all/popular
python3 parse.py https://www.food.com/recipe/all/quick-and-easy
python3 parse.py https://www.food.com/recipe/all/healthy
python3 parse.py https://www.food.com/recipe/all/editor-pick
python3 parse.py https://www.food.com/recipe/all/newest


echo "DONE"


sed -i '1d' recipes.txt

echo "scraping sites this may take a while"

python3 scraperFood.py
