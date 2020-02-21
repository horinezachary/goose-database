#!/bin/python
import sys
import json
from recipe_scrapers import scrape_me 
import requests
from bs4 import BeautifulSoup 
from selenium import webdriver



f = open('recipes.txt', 'r')

def getAuthor(soup):
    job_elem = soup.find('', {"class":"contributor"});
    return job_elem['title']
        
def getYield(soup):
    job_elem = soup.find_all('', {"class":"yield"})
    return job_elem[1].contents[0]

def getTime(driver, soup):
    job_elem = soup.find_all('dl', {"class":"summary-data"})
    try: 
        js = driver.find_element_by_class_name('active-time')
        print(js)
    except:
        print("not found")

    #for j in job_elem:
     #   print(j)

    #return job_elem[1].contents[0]

for line in f:
    jsonOut = {}
    scraper = scrape_me(line.rstrip())
    driver = webdriver.Chrome(executable_path='/home/ryan/Documents/goose-database/chromedriver')
    driver.get(line.rstrip())
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    

    jsonOut["author"] = getAuthor(soup)
    jsonOut["title"] = scraper.title()
    jsonOut["ingredients"] = scraper.ingredients()
    jsonOut["time"] = getTime(driver, soup)
    jsonOut["yield"] = getYield(soup)
    jsonOut["directions"] = scraper.instructions()
    jsonOut["url"] = line.rstrip()
    print(json.dumps(jsonOut))
    driver.quit()
f.close()
