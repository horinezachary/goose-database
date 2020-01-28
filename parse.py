#!/bin/python
import requests
from bs4 import BeautifulSoup
from selenium import webdriver

holdurl='https://www.epicurious.com'

url = 'https://www.epicurious.com/search/?content=recipe'
pageadd='&page='


for i in range(1,18):
    if i != 1:
        finalurl=url+pageadd+str(i)
    else:
        finalurl=url

    driver = webdriver.Chrome(executable_path='/home/ryan/Documents/goose-database/chromedriver')
    driver.get(finalurl)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    driver.quit()
    job_elems = soup.find_all('', {"class":"recipe-content-card"})


    for job_elem in job_elems:
        ref=job_elem.find('', {"class":"photo-link"})
        final=holdurl+ref['href']
        print(final)
