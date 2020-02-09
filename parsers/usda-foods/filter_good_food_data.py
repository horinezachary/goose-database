import json

foods = {}

with open("foods.json") as f:
    foods = json.load(f)

required_nutrients = [
    "Energy",
    "Carbohydrate, by summation",
    "Fiber, total dietary",
    "Sugars, total including NLEA",
    "Total lipid (fat)",
    "Fatty acids, total saturated",
    "Fatty acids, total trans",
    "Sodium, Na",
]


def has_required_nutriends(food):
    if "nutrients" not in food:
        return False
    for nutrient in food["nutrients"]:
        if nutrient["nutrient"]["name"] not in required_nutrients:
            return False
    return True


good_foods = {}

for food_id, food_values in foods.items():
    if has_required_nutriends(food_values):
        good_foods[food_id] = food_values


with open("good_foods.json", "w+") as f:
    f.write(json.dumps(good_foods))
