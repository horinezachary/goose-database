#!/bin/python
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException

holdurl='https://www.allrecipes.com'

url = 'https://www.allrecipes.com/recipes/94/soups-stews-and-chili/?internalSource=top%20hubs&referringContentType=Homepage'
pageadd='&page='
f = open('recipes.txt', 'a')
i = 2
while i:
    if i == 500:
        break
    if i != 1:
        finalurl=url+pageadd+str(i)
    else:
        finalurl=url

    driver = webdriver.Chrome(executable_path='/home/ryan/Documents/goose-database/chromedriver')
    driver.set_page_load_timeout(2)
    try:
        driver.get(finalurl)
    except TimeoutException:
        driver.execute_script("window.stop();")
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    driver.quit()
    job_elems = soup.find_all('', {"class":"fixed-recipe-card"})
    for job_elem in job_elems:
        ref=job_elem.find('', {"class":"grid-card-image-container"})
        final=ref.find('a')
        print(final['href'])
        f.write('\n')
        f.write(final['href'])
    i+=1
f.close()
