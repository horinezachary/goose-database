#!/bin/python
import sys
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException

url = str(sys.argv[1]) #'https://www.food.com/recipe?ref=nav'
print(url)
pageadd='&pn='
f = open("recipes.txt", "a")
i = 1
while i:
    if i == 2000:
        break
    if i == 1:
        finalurl=url
    else:
        finalurl= url+pageadd+str(i)
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    driver = webdriver.Chrome(chrome_options=options)
    driver.set_page_load_timeout(5)
    try:
        driver.get(finalurl)
    except TimeoutException:
        print('timeout')


    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()
    job_elems = soup.find_all(
        "", {"class": "fd-tile fd-recipe"}
    )
    for job_elem in job_elems:
         f.write("\n")
         f.write(job_elem['data-url'])
    i+=1
    
f.close()
