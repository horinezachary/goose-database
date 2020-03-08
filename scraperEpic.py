#!/bin/python
import sys
import json
from recipe_scrapers import scrape_me 
import requests
from bs4 import BeautifulSoup 
from selenium import webdriver
from selenium.common.exceptions import TimeoutException


f = open('recipes.txt', 'r')

def getAuthor(soup):
    try:
        job_elem = soup.find('', {"class":"contributor"});
        return job_elem['title']
    except:
        return 'none'
        
def getYield(soup):
    try:
        job_elem = soup.find_all('', {"class":"yield"})
        return job_elem[1].contents[0]
    except:
        return 'none'

def strip(instructions):
    inst = instructions.split(".")
    inst.pop()
    return inst


num = 204
i = 0
fileout = open('recipeJson' + str(num) + '.json', 'a')
for line in f:
    if i > 50 :
        fileout.close()
        num+=1
        fileout = open('recipeJson' + str(num) + '.json', 'a')
        i = 0
    jsonOut = {}
    scraper = scrape_me(line.rstrip())
    driver = webdriver.Chrome(executable_path='/home/ryan/Documents/goose-database/chromedriver')
    #driver = webdriver.Chrome()
    driver.set_page_load_timeout(1)
    try:
        driver.get(line.rstrip())
    except TimeoutException:
        driver.execute_script("window.stop();")
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    jsonOut["author"] = getAuthor(soup)
    jsonOut["title"] = scraper.title()
    jsonOut["ingredients"] = scraper.ingredients()
 #   jsonOut["time"] = getTime(driver, soup)
    jsonOut["yield"] = getYield(soup)
    jsonOut["cook_time"] = "none"
    jsonOut["prep_time"] = "none"
    jsonOut["directions"] = strip(scraper.instructions())
    jsonOut["url"] = line.rstrip()
    jsonOut["source"] = "epicurious.com"
    json.dump(jsonOut, fileout, indent=4)
    driver.quit()
    i+=1
f.close()
