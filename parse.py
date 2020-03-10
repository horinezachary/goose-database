#!/bin/python
import sys
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException

holdurl = "https://www.bbc.co.uk"

# url = 'https://www.bbc.co.uk/food/recipes/a-z/a/'
url = str(sys.argv[1])
f = open("recipes.txt", "a")
i = 1
while i:
    if i == (int(sys.argv[2]) + 1):
        break

    finalurl = url + str(i)

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
        "div", {"class": "gel-layout__item gel-1/2 gel-1/3@m gel-1/4@xl"}
    )
    for job_elem in job_elems:
        # ref=job_elem.find('', {"class":"grid-card-image-container"})
        # print(job_elem)
        final = job_elem.find("a")
        print(holdurl + final["href"])
        f.write("\n")
        f.write(holdurl + final["href"])
    i += 1
f.close()
