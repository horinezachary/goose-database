#!/bin/python
import sys
import json
from recipe_scrapers import scrape_me 


f = open('recipes.txt', 'r')

final = []


for line in f:
    jsonOut = {}
    print()
    print()
    scraper = scrape_me(line.rstrip())
    #jsonOut['author'] = scraper.author()
    jsonOut['title'] = scraper.title()
    jsonOut['ingredients'] = scraper.ingredients()
    jsonOut['time'] = scraper.total_time()
    jsonOut['directions'] = scraper.instructions()
    final.append(jsonOut)
    print()
    print()
f.close()
print(final)
