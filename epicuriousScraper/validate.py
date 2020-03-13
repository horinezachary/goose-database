import os 
import json

pathname = './data/'

for file in os.listdir('./data'):
    print(pathname+file)
    if file.endswith(".json"):
        f = open(pathname+file, 'r')
        newf = open(pathname+'new'+file, 'w')
        #for line in f:
         #   if line.strip():
         #       try:
         #           data = json.load(line)
         #           full_data.append(data)
         #       except:
         #           not_parsed.append(line)
        
        #print(f.read())
        newf.write(('['+f.read()+']').replace('}', '},').replace('{\n','{'))
        #print(not_parsed)
        f.close()
