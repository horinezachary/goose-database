#!/bin/bash

echo "Setting up some stuff for scraping to work"
pip3 install selenium
pip3 install recipe-scrapers
pip3 install beautifulsoup4


echo "Scraping recipe URLS into recipes.txt....."

python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/a/ 10
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/b/ 36
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/c/ 63
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/d/ 7
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/e/ 9
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/f/ 14
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/g/ 19
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/h/ 18
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/i/ 4
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/j/ 3
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/k/ 4
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/l/ 18
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/m/ 23
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/n/ 3
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/o/ 6
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/p/ 41
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/q/ 4
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/r/ 26
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/s/ 70
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/t/ 22
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/u/ 1
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/v/ 11
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/w/ 10
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/y/ 1
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/z/ 1
python3 parse.py https://www.bbc.co.uk/food/recipes/a-z/0-9/ 1

echo "DONE"


sed -i '1d' recipes.txt

echo "scraping sites this may take a while"

python3 scraperBbc.py
