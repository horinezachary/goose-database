import json
import os

import pymysql

user = os.getenv("USER")
password = os.getenv("PWD")
db = os.getenv("DBNAME")
host = os.getenv("HOST")

connection = pymysql.connect(host=host, user=user, password=password, db=db)

ingredients = {}

with open("good_foods.json") as f:
    ingredients = json.load(f)


for ingredient_id, ingredient in ingredients.items():
    if "nutrients" in ingredient:
        calories = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"] == "Energy",
                ingredient["nutrients"],
            )
        )

        carbs = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"]
                == "Carbohydrate, by summation",
                ingredient["nutrients"],
            )
        )
        fiber = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"] == "Fiber, total dietary",
                ingredient["nutrients"],
            )
        )
        sugar = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"]
                == "Sugars, total including NLEA",
                ingredient["nutrients"],
            )
        )
        fat = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"] == "Total lipid (fat)",
                ingredient["nutrients"],
            )
        )
        satFat = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"]
                == "Fatty acids, total saturated",
                ingredient["nutrients"],
            )
        )
        transFat = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"]
                == "Fatty acids, total trans",
                ingredient["nutrients"],
            )
        )
        sodium = list(
            filter(
                lambda nutrient: nutrient["nutrient"]["name"] == "Sodium, Na",
                ingredient["nutrients"],
            )
        )

        with connection.cursor() as cursor:
            insert_ingredient = "INSERT INTO ingredient (name) VALUES (%s)"
            cursor.execute(insert_ingredient, (ingredient["description"][:100]))
            last_id = cursor.lastrowid

            insert_nutrition = "INSERT INTO nutrition (ingredient, calories, serving_size, total_carbs, dietary_fiber, sugars, total_fat, saturated_fat, trans_fat, sodium, vitamins_minerals) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s)"
            amt = carbs[0]["amount"] if len(carbs) == 1 else -1
            print(f"{ingredient_id} carbs: {amt}")
            cursor.execute(
                insert_nutrition,
                (
                    last_id,
                    calories[0]["amount"] if len(calories) == 1 else 0,
                    0,
                    carbs[0]["amount"] if len(carbs) == 1 and carbs[0]["amount"] else 0,
                    fiber[0]["amount"] if len(fiber) == 1 and fiber[0]["amount"] else 0,
                    sugar[0]["amount"] if len(sugar) == 1 and sugar[0]["amount"] else 0,
                    fat[0]["amount"] if len(fat) == 1 and fat[0]["amount"] else 0,
                    satFat[0]["amount"]
                    if len(satFat) == 1 and satFat[0]["amount"]
                    else 0,
                    transFat[0]["amount"]
                    if len(transFat) == 1 and transFat[0]["amount"]
                    else 0,
                    sodium[0]["amount"]
                    if len(sodium) == 1 and sodium[0]["amount"]
                    else 0,
                    0,
                ),
            )
        connection.commit()

