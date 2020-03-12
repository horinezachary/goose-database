#!/bin/python
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException


url = "https://www.bbcgoodfood.com/search/recipes?query="
pageadd = "#page="
holdurl='https://www.bbcgoodfood.com'
f = open("recipes.txt", "a")
i = 1
while i:
    if i == 869:
        break
    finalurl = url + pageadd + str(i)

    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(5)
    try:
        driver.get(finalurl)
    except TimeoutException:
        driver.execute_script("window.stop();")
    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()
    job_elems = soup.find_all("", {"class": "teaser-item__title"})
    for job_elem in job_elems:
        final = job_elem.find("a")
        #print(holdurl+final["href"])
        f.write("\n")
        f.write(holdurl+final["href"])
    i += 1
f.close()
