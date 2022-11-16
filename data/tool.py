import json

with open("data/taipei-attractions.json", "r") as jsonFile:
    data = json.load(jsonFile)


def insertMrtAndCat(mycursor, conn):
    addMrt(mycursor, data)
    addCat(mycursor, data)


def addMrt(mycursor, data):
    mrtSet = set()
    for i in range(data["result"]["count"]):
        results = data["result"]["results"][i]
        mrt = results["MRT"]
        mrtSet.add(mrt)

    mycursor.execute("INSERT INTO trip.mrt (mrt) VALUES (%s)", (None,))

    for mrt in mrtSet:
        if (mrt == None):
            continue
        mycursor.execute("INSERT INTO trip.mrt (mrt) VALUES (%s)", (mrt,))


def addCat(mycursor, ata):
    categorySet = set()
    for i in range(data["result"]["count"]):
        results = data["result"]["results"][i]
        category = results["CAT"]
        categorySet.add(category)

    mycursor.execute(
        "INSERT INTO trip.category (category) VALUES (%s)", (None, ))

    for cat in categorySet:
        if (cat == None):
            continue
        mycursor.execute(
            "INSERT INTO trip.category (category) VALUES (%s)", (cat, ))


def getAllMrt(mycursor):
    mycursor.execute("SELECT * FROM trip.mrt")
    mrts = mycursor.fetchall()
    return mrts


def getAllCat(mycursor):
    mycursor.execute("SELECT * FROM trip.category")
    categories = mycursor.fetchall()
    return categories


def turnMrtToDict(mrtResult):
    mrtDict = dict()
    for result in mrtResult:
        mrtDict.update({result[1]: result[0]})
    return mrtDict


def turnCatToDict(catResult):
    catDict = dict()
    for result in catResult:
        catDict.update({result[1]: result[0]})
    return catDict


def insertAttraction(mycursor, conn, mrtDict, catDict):
    for i in range(data["result"]["count"]):
        results = data["result"]["results"][i]

        images = results["file"]
        imageList = images.split("https")
        imageList.pop(0)

        imageResultList = []
        for url in imageList:
            if (url[-4:].lower() != ".jpg" and url[-4:].lower() != ".png"):
                continue
            imageResultList.append("https" + url)

        name = results["name"]
        category = catDict.get(results["CAT"])
        description = results["description"]
        address = results["address"]
        transport = results["direction"]
        mrt = mrtDict.get(results["MRT"])
        image = json.dumps(imageResultList)
        latitude = results["latitude"]
        longitude = results["longitude"]

        mycursor.execute("INSERT INTO trip.attraction (attraction_name, category_id, image, description, address, transport, mrt_id, latitude, longitude) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                         (name, category, image, description, address, transport, mrt, latitude, longitude))
