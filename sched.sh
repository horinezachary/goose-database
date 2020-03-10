#!/bin/bash

echo "Setting up some stuff for scraping to work"
#pip3 install selenium
#pip3 install recipe-scrapers
#pip3 install beautifulsoup4


echo "Scraping recipe URLS into recipes.txt....."
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/123
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/a
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/b
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/c
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/d
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/e
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/f
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/g
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/h
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/i
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/j
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/k
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/l
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/m
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/n
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/o
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/p
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/q
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/r
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/s
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/t
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/u
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/v
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/w
python3 parse.py https://www.foodnetwork.com/recipes/recipes-a-z/xyz






echo "DONE"


sed -i '1d' recipes.txt

echo "scraping sites this may take a while"

# python3 scraperBbc.py
