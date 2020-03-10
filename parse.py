#!/bin/python
import sys
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException

url = "https://www.foodnetwork.com/recipes/recipes-a-z/123"

# url = 'https://www.bbc.co.uk/food/recipes/a-z/a/'
#url = str(sys.argv[1])
f = open("recipes.txt", "a")
i = 1
while i:
    if i == 2:
        break

    finalurl = url

    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    driver = webdriver.Chrome(chrome_options=options)
    driver.set_page_load_timeout(10)
    try:
        driver.get(finalurl)
    except TimeoutException:
        driver.execute_script("window.stop();")
    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()
    job_elems = soup.find_all(
        "", {"class": "m-PromoList__a-ListItem"}
    )

    #print(job_elems)
    for job_elem in job_elems:
       # print(job_elem)
        final = job_elem.find("a")
        #print(https:final["href"])
        f.write("\n")
        f.write('https:' + final["href"])
    i += 1
f.close()
