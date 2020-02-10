# Instructions

This parser uses 3 scripts in sequences:
1. `parse_nutrients.py` generates a `nutrients.json` file with nutrient information
2. `parse_ingredients.py` generates a `foods.json` file with raw ingredient information
3. `filter_good_food_data.py` generates a `good_foods.json` file with only foods that have all of the required nutrients for the database

# Requirements

I didn't use a lot of Python 3 specific code, but this was developed with Python 3.8 so I can't guarantee it will run with a different Python version.

These scripts require two datasets downloaded from [here](https://fdc.nal.usda.gov/download-datasets.html):
* Foundation foods
* Supporting data for downloads

Unzip the foundation foods into the base directory of the parser, and unzip the supporting data into the `supporting` directory.

You can also run the `get_files.sh` script, which will fetch the required files and the result file from a google cloud storage bucket so you don't have to deal with zip files.

# Results:

Results are stored in the `good_foods.json` file, which is an object in the following format:
```json
{
  <food_id>: {
    "data_type": <data type>,
    "description": <description>,
    "food_category_id": <food category id>,
    "publication_date": <publication date>,
    "nutrients": [
      {
        "amount": <amount>,
        "nutrient": {
          "id": <id>,
          "name": <name>,
          "unit_name": <unit name>,
          "nutrient_nbr": <nutrient number>,
          "rank": <rank>
        }
      }
    ]
  }
}
```
