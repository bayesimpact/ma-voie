import csv
import json

def import_csv():
    keys = {}
    with open('./spanish.csv') as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            fr, es = row
            keys[fr] = es
    print(json.dumps(keys))

import_csv()
