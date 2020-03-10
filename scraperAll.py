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


f = open("recipes.txt", "r")


def getAuthor(soup):
    try:
        job_elem = soup.find_all("", {"class": "submitter__name"})
        return job_elem[0].contents[0]
    except:
        return "none"


def getYield(soup):
    try:
        job_elem = soup.find_all("", {"class": "yield"})
        return job_elem[1].contents[0]
    except:
        return "none"


def strip(instructions):
    inst = instructions.split(".")
    inst.pop()
    return inst


def scrape(index, total_processes, recipes):
    # splitting the full recipes list into chunks of size len(recipes) / total_processes
    minIndex = int(index * len(recipes) / total_processes)
    maxIndex = minIndex + int(len(recipes) / total_processes)
    localRecipes = recipes[minIndex:maxIndex]

    # if there are "extra" recipes, give them to the last process
    if index == total_processes - 1 and len(recipes) >= maxIndex - 1:
        localRecipes += recipes[maxIndex:]

    data = []
    for i, recipe in enumerate(localRecipes):
        if (i % 100) == 0:
            with open("outRecipes_" + str(index) + "_" + str(i) + ".json", "w+") as f:
                json.dump({"data": data}, f)
            data = []
        jsonOut = {}
        scraper = scrape_me(recipe.rstrip())
        options = webdriver.ChromeOptions()
        options.add_argument("headless")
        driver = webdriver.Chrome(options=options)
        # driver = webdriver.Chrome()
        driver.set_page_load_timeout(10)
        try:
            driver.get(recipe.rstrip())
            soup = BeautifulSoup(driver.page_source, "html.parser")

            jsonOut["author"] = getAuthor(soup)
            jsonOut["title"] = scraper.title()
            jsonOut["ingredients"] = scraper.ingredients()
            #      jsonOut["time"] = getTime(driver, soup)
            jsonOut["yield"] = scraper.yields()
            jsonOut["cook_time"] = scraper.total_time()
            jsonOut["prep_time"] = "none"
            jsonOut["directions"] = strip(scraper.instructions())
            jsonOut["url"] = recipe.rstrip()
            jsonOut["source"] = "allrecipes.com"
            driver.quit()
            data.append(jsonOut)
        except TimeoutException:
            print("time out on " + recipe)
    with open("outRecipes_" + str(index) + "_" + str(i) + ".json", "w+") as f:
        json.dump({"data": data}, f)
    data = []


if __name__ == "__main__":

    recipes = f.read().splitlines()
    num_cpus = cpu_count()
    with Pool(cpu_count() - 1) as p:
        p.starmap(
            scrape,
            zip(
                range(num_cpus),
                [num_cpus for _ in range(num_cpus)],
                [recipes for _ in range(num_cpus)],
            ),
        )
    p.close()
    p.join()
    f.close()
