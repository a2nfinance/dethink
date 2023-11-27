import json

# Opening JSON data
with open('data/Diablo4DatabaseAxe.json', 'r') as openfile:
    # Reading from JSON data
    diab = json.load(openfile)

# Number of images    
N = len(diab)

# Extract links' image
img_list = []
for i in range(N):
    img_list.append(diab[i]['icon'])

# Save links' image to JSON
axe_link = {"axe":img_list}

with open("data/axeicon.json", "w") as outfile:
    json.dump(axe_link, outfile)