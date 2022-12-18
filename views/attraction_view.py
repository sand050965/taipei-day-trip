from flask import jsonify


class AttractionView:

    def renderGetAttractionByPageKeyword(attractions, page):
        dataList = []

        if (len(attractions) != 0):

            for i in range(len(attractions)):

                if i == 12:
                    break

                dataList.append({
                    "id": attractions[i]["id"],
                    "name": attractions[i]["attraction_name"],
                    "category": attractions[i]["category"],
                    "description": attractions[i]["description"],
                    "address": attractions[i]["address"],
                    "transport": attractions[i]["transport"],
                    "mrt": attractions[i]["mrt"],
                    "lat": attractions[i]["latitude"],
                    "lng": attractions[i]["longitude"],
                    "images": (attractions[i]["images"].split(","))
                })

        nextPage = None

        if (len(attractions) == 13):
            nextPage = page + 1

        return jsonify({
            "nextPage": nextPage,
            "data": dataList
        })

############################################################

    def renderGetAttractionById(attraction):

        if (attraction == None):
            return jsonify({
                "error": True,
                "message": "景點編號不正確"
            }), 400

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

############################################################

    def renderError(message):
        return jsonify(
            {
                "error": True,
                "message": message
            }
        )
