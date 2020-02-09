import csv
import json

nutrients = {}

with open("supporting/nutrient.csv") as f:
    nutrient_reader = csv.reader(f)
    next(nutrient_reader)
    for row in nutrient_reader:
        nutrient = {
            "id": row[0],
            "name": row[1],
            "unit_name": row[2],
            "nutrient_nbr": row[3],
            "rank": row[4],
        }
        nutrients[row[0]] = nutrient

with open("nutrients.json", "w+") as f:
    f.write(json.dumps(nutrients))

