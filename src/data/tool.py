import json

with open("data/taipei-attractions.json", "r") as jsonFile:
    data = json.load(jsonFile)


def processImage(mycursor, id, urlList):
    for url in urlList:
        if (url[-4:].lower() != ".jpg" and url[-4:].lower() != ".png"):
            continue
        url = "https" + url
        mycursor.execute(
            "INSERT INTO image (attraction_id, image_url) VALUES (%s, %s)", (id, url))


def insertAttraction(mycursor, conn):
    for i in range(data["result"]["count"]):
        results = data["result"]["results"][i]

        images = results["file"]
        imageList = images.split("https")
        imageList.pop(0)
        processImage(mycursor, i+1, imageList)

        name = results["name"]
        category = results["CAT"]
        description = results["description"]
        address = results["address"]
        transport = results["direction"]
        mrt = results["MRT"]
        latitude = results["latitude"]
        longitude = results["longitude"]

        mycursor.execute("INSERT INTO attraction (attraction_name, category, description, address, transport, mrt, latitude, longitude) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                         (name, category, description, address, transport, mrt, latitude, longitude))
