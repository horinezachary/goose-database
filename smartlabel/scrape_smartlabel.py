from bs4 import BeautifulSoup
import json
import os
import random
import re
from typing import Dict, List
import multiprocessing

import mysql.connector
from mysql.connector import pooling
import requests

user = os.getenv("DBUSER")
password = os.getenv("DBPWD")
db = os.getenv("DBNAME")
host = os.getenv("DBHOST")

num_threads = multiprocessing.cpu_count() * 40
pool = pooling.MySQLConnectionPool(
    pool_size=pooling.CNX_POOL_MAXSIZE,
    host=host,
    user=user,
    password=password,
    database=db,
)

search = re.compile("window.sl")


def getNutrient(nutrientName: str, nutrients: List) -> int:
    for nutrient in nutrients:
        if nutrient["name"] == nutrientName:
            return nutrient["value"]
    return 0


def scrape_id(id: int, error_ids: List):
    print(id)
    res = requests.get(
        "https://smartlabel.labelinsight.com/product/" + str(id) + "/nutrition"
    )

    text = res.text
    if res.status_code >= 400:
        error_ids.append({"id": id, "error": "not found"})
        return
    soup = BeautifulSoup(text, features="html.parser")

    [script] = soup.find_all("script", text=search)
    clean_text = script.text.strip()[31:-43]
    data = ""
    try:
        data = json.loads(clean_text)
    except:
        error_ids.append({"id": id, "error": "error parsing text"})
        return
    name = data.get("description", "")
    nutrients = data["nutritionSection"]["nutrientPanels"][0].get("nutrients", [])
    servingSize = data["nutritionSection"]["nutrientPanels"][0].get("servingSize", "")

    calories = getNutrient("Calories", nutrients)
    fat = getNutrient("Total Fat", nutrients)
    satFat = getNutrient("Saturated Fat", nutrients)
    transFat = getNutrient("Trans Fat", nutrients)
    sodium = getNutrient("Sodium", nutrients)
    carbs = getNutrient("Total Carbohydrate", nutrients)
    fiber = getNutrient("Dietary Fiber", nutrients)
    sugar = getNutrient("Sugars", nutrients)

    conn = pool.get_connection()
    cursor = conn.cursor(prepared=True)

    get_ingredient = "SELECT ingredient_id FROM ingredient WHERE name = %s"
    try:
        cursor.execute(get_ingredient, params=(name,))
        records = cursor.fetchall()
        id = 0
        if len(records) > 0:
            id = records[0][0]
        else:
            insert_ingredients = "INSERT IGNORE INTO ingredient (name) values (%s)"
            cursor.execute(insert_ingredients, params=(name,))
            id = cursor.lastrowid

        insert_nutrition = "INSERT INTO nutrition (ingredient_id, calories, serving_size, total_carbs, dietary_fiber, sugars, total_fat, saturated_fat, trans_fat, sodium, vitamins_minerals) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

        cursor.execute(
            insert_nutrition,
            (
                id,
                calories,
                servingSize,
                carbs,
                fiber,
                sugar,
                fat,
                satFat,
                transFat,
                sodium,
                0,
            ),
        )

        conn.commit()
    except:
        error_ids.append({"id": id, "error": "sql error"})


error_ids = []
ids = range(3000000, 10000000)
print(len(ids))
with multiprocessing.Pool(num_threads) as p:
    with multiprocessing.Manager() as m:
        l = m.list()
        p.starmap(scrape_id, zip(ids, [l for _ in range(len(ids))]))
        print(len(l))
        print(l)
