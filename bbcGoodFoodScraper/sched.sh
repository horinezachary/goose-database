#!/bin/bash
python3 parse.py
sed -i '1d'
python3 scraperBbcgood.py
