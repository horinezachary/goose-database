#!/bin/python
import sys
import json
from recipe_scrapers import scrape_me
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from itertools import repeat
from multiprocessing import Pool, cpu_count, Manager

sys.setrecursionlimit(10000)


f = open("recipes.txt", "r")


def getAuthor(soup):
    try:
        job_elem = soup.find("", {"class": "o-Attribution__a-Name"})
        return job_elem.find('a').contents
    except:
        return 'none'

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


def scrape(index, total_processes, outList, recipes):
    fileNum = 0
    i = 0

    # splitting the full recipes list into chunks of size len(recipes) / total_processes
    minIndex = int(index * len(recipes) / total_processes)
    maxIndex = minIndex + int(len(recipes) / total_processes)
    localRecipes = recipes[minIndex:maxIndex]

    # if there are "extra" recipes, give them to the last process
    if index == total_processes - 1 and len(recipes) >= maxIndex - 1:
        localRecipes += recipes[maxIndex:]

    for recipe in localRecipes:
        if i > 50:
            fileout.write("]")
            fileout.close()
            fileNum += 1
            fileout = open("recipeJson" + str(fileNum) + ".json", "a")
            i = 0
        jsonOut = {}
        scraper = scrape_me(recipe.rstrip())
        options = webdriver.ChromeOptions()
        options.add_argument("headless")
        driver = webdriver.Chrome(options=options)
        # driver = webdriver.Chrome()
        driver.set_page_load_timeout(10)
        try:
            driver.get(recipe.rstrip())
        except TimeoutException:
            driver.execute_script("window.stop();")
        soup = BeautifulSoup(driver.page_source, "html.parser")
        print(recipe)
        jsonOut["author"] = getAuthor(soup)
        jsonOut["title"] = scraper.title()
        jsonOut["ingredients"] = scraper.ingredients()
        jsonOut["yield"] = scraper.yields()
        jsonOut["cook_time"] = scraper.total_time()
        jsonOut["prep_time"] = getPrep(soup)
        jsonOut["directions"] = strip(scraper.instructions())
        jsonOut["url"] = recipe.rstrip()
        jsonOut["source"] = "foodnetwork.com"
        driver.quit()

        # add data to the output list data structure
        outList.append(jsonOut)


if __name__ == "__main__":

    recipes = f.read().splitlines()
    with Manager() as m:
        data = m.list()
        num_cpus = cpu_count()
        with Pool(num_cpus) as p:
            p.starmap(
                scrape,
                zip(
                    range(num_cpus),
                    [num_cpus for _ in range(num_cpus)],
                    [data for _ in range(num_cpus)],
                    [recipes for _ in range(num_cpus)],
                ),
            )
        p.close()
        p.join()
        f.close()

        with open("outRecipes.json", "w+") as f:
            outData = {"data": list(data)}
            json.dump(outData, f)

