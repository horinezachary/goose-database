#!/bin/python
import sys
import json
from recipe_scrapers import scrape_me
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from itertools import repeat
from multiprocessing import Pool, cpu_count, Queue


f = open("recipes.txt", "r")


def getAuthor(soup):
    try:
        job_elem = soup.find_all("", {"class": "chef__image-link"})
        return job_elem[0]["title"]
    except:
        return "none"


def getYield(soup):
    try:
        job_elem = soup.find_all("", {"class": "yield"})
        return job_elem[1].contents[0]
    except:
        return "none"


def getPrep(soup):
    try:
        job_elem = soup.find_all("", {"class": "recipe-metadata__prep-time"})
        return job_elem[0].contents[0]
    except:
        return "none"


def strip(instructions):
    inst = instructions.split(".")
    inst.pop()
    return inst


def scrape(num):
    fileNum = 0
    i = 0
    fileout = open("recipeJson" + str(fileNum) + ".json", "a")
    fileout.write("[")
    for line in f:
        if i > 50:
            fileout.write("]")
            fileout.close()
            fileNum += 1
            fileout = open("recipeJson" + str(fileNum) + ".json", "a")
            i = 0
        jsonOut = {}
        scraper = scrape_me(line.rstrip())
        driver = webdriver.Chrome()
        # driver = webdriver.Chrome()
        driver.set_page_load_timeout(2)
        try:
            driver.get(line.rstrip())
        except TimeoutException:
            driver.execute_script("window.stop();")
        soup = BeautifulSoup(driver.page_source, "html.parser")

        jsonOut["author"] = getAuthor(soup)
        jsonOut["title"] = scraper.title()
        jsonOut["ingredients"] = scraper.ingredients()
        jsonOut["yield"] = scraper.yields()
        jsonOut["cook_time"] = scraper.total_time()
        jsonOut["prep_time"] = getPrep(soup)
        jsonOut["directions"] = strip(scraper.instructions())
        jsonOut["url"] = line.rstrip()
        jsonOut["source"] = "bbc.co.uk"
        json.dump(jsonOut, fileout, indent=4)
        fileout.write(",")
        driver.quit()
        i += 1
        # print(json.dumps(jsonOut, indent=4))


if __name__ == "__main__":

    q = Queue()
    # scrape(5)
    with Pool(cpu_count() - 1) as p:
        p.starmap(scrape, zip(range(1, 2000)))
    p.close()
    p.join()
    f.close()
