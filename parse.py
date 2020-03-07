#!/bin/python
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import TimeoutException

holdurl='https://www.cafedelites.com'

url = 'https://cafedelites.com/recipes/'
pageadd='page/'
f = open('recipes.txt', 'a')
i = 1
while i:
    if i == 90:
        break
    if i != 1:
        finalurl=url+pageadd+str(i)
    else:
        finalurl=url

    driver = webdriver.Chrome(executable_path='/home/ryan/Documents/goose-database/chromedriver')
    driver.set_page_load_timeout(10)
    try:
        driver.get(finalurl)
    except TimeoutException:
        driver.execute_script("window.stop();")
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    driver.quit()
    job_elems = soup.find_all('', {"class":"entry-image-link"})
   # print(job_elems)

    for job_elem in job_elems:
        #ref=job_elem.find('', {"class":"photo-link"})
        #final=holdurl+ref['href']
        print(job_elem['href'])
        #f.write('\n')
        #f.write(final)
    
    i+=1
f.close()
