import csv
import json

foods = {}

with open("food.csv") as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        food = {
            "data_type": row[1],
            "description": row[2],
            "food_category_id": row[3],
            "publication_date": row[4],
        }
        foods[row[0]] = food

nutrients = {}

with open("nutrients.json") as f:
    nutrients = json.load(f)

food_nutrients = []
with open("food_nutrient.csv") as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        food_id = row[1]
        print(food_id)
        food_nutrients = foods[food_id].get("nutrients", [])

        food_nutrients.append({"amount": row[4], "nutrient": nutrients[row[2]]})
        foods[food_id]["nutrients"] = food_nutrients

with open("foods.json", "w+") as f:
    f.write(json.dumps(foods))
