from flask import jsonify


class AttractionView:

    def renderGetAttractionByPageKeyword(attractions):
        dataList = []
        nextPage = None
        page = int(attractions["page"])
        attractionsData = attractions["data"]
        
        for i in range(len(attractionsData)):
            if i == 12:
                nextPage = page + 1
                break

            dataList.append({
                "id": attractionsData[i]["id"],
                "name": attractionsData[i]["attraction_name"],
                "category": attractionsData[i]["category"],
                "description": attractionsData[i]["description"],
                "address": attractionsData[i]["address"],
                "transport": attractionsData[i]["transport"],
                "mrt": attractionsData[i]["mrt"],
                "lat": attractionsData[i]["latitude"],
                "lng": attractionsData[i]["longitude"],
                "images": (attractionsData[i]["images"].split(","))
            })

        return jsonify({
            "nextPage": nextPage,
            "data": dataList
        })


    def renderGetAttractionById(attraction):
        dataSet = {
            "id": attraction["id"],
            "name": attraction["attraction_name"],
            "category": attraction["category"],
            "description": attraction["description"],
            "address": attraction["address"],
            "transport": attraction["transport"],
            "mrt": attraction["mrt"],
            "lat": attraction["latitude"],
            "lng": attraction["longitude"],
            "images": (attraction["images"].split(","))
        }

        return jsonify({"data": dataSet})


    def renderError(message):
        return jsonify(
            {
                "error": True,
                "message": message
            }
        )
