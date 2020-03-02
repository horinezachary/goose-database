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


def has_required_nutriends(food) -> bool:
    if "nutrients" not in food:
        return False
    num_nutrients = 0
    for nutrient in required_nutrients:
        for n2 in food["nutrients"]:
            if n2["nutrient"]["name"] == nutrient:
                num_nutrients += 1
    return num_nutrients >= 2


good_foods = {}

for food_id, food_values in foods.items():
    if has_required_nutriends(food_values):
        good_foods[food_id] = food_values


with open("good_foods.json", "w+") as f:
    f.write(json.dumps(good_foods))
